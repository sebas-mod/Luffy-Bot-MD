import axios from "axios";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "es-ES,es;q=0.9",
    "Referer": "https://www.dafont.com/"
};

async function obtenerUrlDescarga(urlFuente) {
    try {
        const { data } = await axios.get(urlFuente, { headers: HEADERS });
        const $ = cheerio.load(data);
        const enlaceDescarga = $("a.dl").attr("href");

        if (!enlaceDescarga) {
            throw new Error("¡No se encontró el enlace de descarga!");
        }

await m.react('🕒');

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
    const urlFuente = text.trim();
    try {
        if (!urlFuente || !urlFuente.startsWith("https://www.dafont.com")) {
            return m.reply("¡URL inválida! Asegúrate de usar un enlace válido de Dafont.");
        }

        const urlDescarga = await obtenerUrlDescarga(urlFuente);
        const respuesta = await axios.head(urlDescarga);
        if (respuesta.status !== 200) {
            throw new Error("¡URL inaccesible!");
        }

        const rutaZip = await descargarFuente(urlDescarga);
        await m.react('✅');
        await enviarFuenteAlUsuario(rutaZip, conn, m);
    } catch (error) {
        console.error(error);
        m.reply(error.message);
    }
};

handler.help = ["dafont *<url>*"];
handler.tags = ["dl"];
handler.command = ["dafont"];

export default handler;