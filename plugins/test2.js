import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "es-ES,es;q=0.9",
    "Referer": "https://www.dafont.com/",
    "Cookie": "PHPSESSID=57to1j7l3q2bm4jj8cp3hjcnp7; _ga=GA1.1.735222474.1735736599; __eoi=ID=80f4924dca104d55:T=1725101280:RT=1735736599:S=AA-Afjafx9HUtWtBeU58TBZaba6w; _ga_W3Z15Z4TYR=GS1.1.1735736598.1.1.1735736606.0.0.0; __gads=ID=6fc638e356053a5a:T=1725853453:RT=1735736606:S=ALNI_MYOTnA2MElBW5CpGSLOZxjmjCxp7Q; __gpi=UID=00000ef5a81aa477:T=1725853453:RT=1735736606:S=ALNI_MYOYl4xhjvabA08qVlVrfYhbdWxTg"
};
async function buscarFuentes(consulta) {
    try {
        const urlBusqueda = `https://www.dafont.com/search.php?q=${encodeURIComponent(consulta)}`;
        const { data } = await axios.get(urlBusqueda, { headers: HEADERS });
        const $ = cheerio.load(data);
        const resultados = [];

        $("div.preview a").each((_, el) => {
            const urlRelativa = $(el).attr("href");
            if (urlRelativa) {
                const urlCompleta = `https://www.dafont.com/${urlRelativa}`;
                resultados.push(urlCompleta);
            }
        });
        if (resultados.length === 0) {
            throw new Error("No se encontraron fuentes.");
        }

        return resultados.slice(0, 5);
    } catch (error) {
        console.error("Error al buscar fuentes:", error.message);
        throw new Error("Error al buscar fuentes.");
    }
}
async function obtenerUrlDescarga(urlFuente) {
    try {
        const { data } = await axios.get(urlFuente, { headers: HEADERS });
        const $ = cheerio.load(data);
        const enlaceDescarga = $("a.dl").attr("href");
        if (!enlaceDescarga) {
            throw new Error("¡No se encontró el enlace de descarga!");
        }
        const urlCompletaDescarga = enlaceDescarga.startsWith('//') ? `https:${enlaceDescarga}` : enlaceDescarga;
        return urlCompletaDescarga;
    } catch (error) {
        console.error("Error al obtener la URL de descarga:", error.message);
        throw new Error("Error al obtener la URL de descarga.");
    }
}
async function descargarFuente(urlZip) {
    try {
        const respuesta = await axios.get(urlZip, {
            responseType: "arraybuffer",
            headers: HEADERS
        });
        const tipoContenido = respuesta.headers["content-type"];
        if (!tipoContenido || !tipoContenido.includes("application/zip")) {
            throw new Error("¡Archivo ZIP fallido!");
        }
        const rutaArchivo = path.resolve(process.cwd(), "fuente.zip");
        fs.writeFileSync(rutaArchivo, respuesta.data);
        return rutaArchivo;
    } catch (error) {
        console.error("Error al descargar la fuente:", error.message);
        throw new Error("Error al descargar la fuente.");
    }
}
async function enviarFuenteAlUsuario(rutaArchivo, conn, m) {
    try {
        const bufferImagen = fs.readFileSync(rutaArchivo);
        await conn.sendMessage(m.chat, {
            document: bufferImagen,
            fileName: "fuente.zip",
            mimetype: "application/zip",
            caption: "Fuente enviada con éxito."
        });

        fs.unlinkSync(rutaArchivo);
    } catch (error) {
        console.error("Error al enviar la fuente:", error.message);
        throw new Error("Error al enviar la fuente.");
    }
}
const handler = async (m, { conn, text }) => {
    const args = text.split(" ");
    const comando = args[0].toLowerCase();
    const consulta = args.slice(1).join(" ");
    try {
        if (comando === "buscar") {
            if (!consulta) return m.reply("`¿Nombre de la fuente?`");

            const resultadosBusqueda = await buscarFuentes(consulta);
            if (resultadosBusqueda.length === 0) {
                return m.reply("No se encontraron fuentes para esta consulta.");
            }
            const textoResultados = resultadosBusqueda
                .map((url, index) => `${index + 1}. ${url}`)
                .join("\n");

            await conn.sendMessage(m.chat, {
                text: `*🔍 Resultados de búsqueda para* "- ${consulta}":\n\n- ${textoResultados}`,
            });
        } else if (comando === "descargar") {
            const urlFuente = consulta.trim();
            if (!urlFuente || !urlFuente.startsWith("https://www.dafont.com")) {
                return m.reply("¡URL inválida!");
            }
            const urlDescarga = await obtenerUrlDescarga(urlFuente);
            const respuesta = await axios.head(urlDescarga);
            if (respuesta.status !== 200) {
                throw new Error("¡URL inaccesible!");
            }

            const rutaZip = await descargarFuente(urlDescarga);
            await enviarFuenteAlUsuario(rutaZip, conn, m);
        } else {
            m.reply("Usa el comando `buscar` para buscar una fuente o `descargar` para descargar una fuente.");
        }
    } catch (error) {
        console.error(error);
        m.reply(error.message);
    }
};
handler.help = ["buscarfuente nombre-fuente", "descargarfuente url-fuente"];
handler.tags = ["descargador"];
handler.command = /^(dafont)$/i;
export default handler;