/*
 • Código Creado por By Izumi.kzx
 • Dafont Search
 • https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import axios from "axios";
import * as cheerio from "cheerio";

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "es-ES,es;q=0.9",
    "Referer": "https://www.dafont.com/"
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

const handler = async (m, { conn, text }) => {
    const consulta = text.trim();
    try {
        if (!consulta) {
            return m.reply("`¿Nombre de la fuente?`");
        }

        await m.react('🕒');
        const resultadosBusqueda = await buscarFuentes(consulta);
        const textoResultados = resultadosBusqueda
            .map((url, index) => `${index + 1}. ${url}`)
            .join("\n");

        await m.react('✅');
        await conn.sendMessage(m.chat, {
            text: `*🔍 Resultados de búsqueda para* "- ${consulta}":\n\n${textoResultados}`,
        });
    } catch (error) {
        console.error(error);
        m.reply(error.message);
    }
};

handler.help = ["dafontsearch *<texto>*"];
handler.tags = ["search"];
handler.command = ["dafontsearch"];

export default handler;