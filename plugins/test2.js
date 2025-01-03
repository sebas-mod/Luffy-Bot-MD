import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import archiver from "archiver";
import { join } from "path";

const handler = async (m, { text, conn }) => {
    if (!text || !/^https?:\/\/[^\s]+$/.test(text)) {
        return m.reply("Por favor, proporciona una URL válida.");
    }
    const targetUrl = text.trim();

    try {
        m.reply("🔄 Descargando imágenes, por favor espera...");

        const response = await axios.get(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
                "Accept-Language": "es-ES,es;q=0.9"
            }
        });

        const $ = cheerio.load(response.data);
        const images = [];
        $("img[itemprop='image']").each((_, el) => {
            const imgUrl = $(el).attr("src");
            if (imgUrl) images.push(imgUrl);
        });

        if (images.length === 0) {
            return m.reply("No se encontraron imágenes en esa página.");
        }

        m.reply(`✅ Se encontraron ${images.length} imágenes. Procesando...`);

        // Crear directorio temporal
        const tempDir = "tmp";
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        for (let i = 0; i < images.length; i++) {
            const imgUrl = images[i];
            const filename = `image_${i + 1}.jpg`;
            const filepath = join(tempDir, filename);
            const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
            fs.writeFileSync(filepath, imgResponse.data);
        }

        // Crear archivo ZIP
        const zipFilename = "komikudl.zip";
        const output = fs.createWriteStream(zipFilename);
        const archive = archiver("zip", { zlib: { level: 9 } });

        output.on("close", async () => {
            await conn.sendFile(m.chat, zipFilename, zipFilename, "📦 Archivo comprimido listo.", m);
            setTimeout(() => {
                // Eliminar archivo ZIP y directorio temporal
                fs.unlinkSync(zipFilename);
                fs.rmSync(tempDir, { recursive: true, force: true });
            }, 10000); // 10 segundos para evitar problemas con archivos grandes
        });

        archive.on("error", (err) => {
            throw err;
        });

        archive.pipe(output);
        archive.directory(tempDir, false);
        archive.finalize();
    } catch (error) {
        console.error("Error:", error.message);
        m.reply(`❌ Ocurrió un error: ${error.message}`);
    }
};

handler.help = ["komikudl <url>"];
handler.tags = ["tools"];
handler.command = /^(komikudl)$/i;
handler.limit = true;

export default handler;