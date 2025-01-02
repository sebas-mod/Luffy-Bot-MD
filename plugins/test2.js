import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import archiver from "archiver";
import {
    join
} from "path";
const handler = async (m, {
    text,
    conn
}) => {
    if (!text) {
        return m.reply("url?");
    }
    const targetUrl = text;
    try {
        const response = await axios.get(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie": "_ga=GA1.1.528428688.1728690628; _ga_Z5L67F199G=GS1.1.1735313381.1.0.1735313389.0.0.0; __ddg9_=36.71.143.235; _ga_ZEY1BX76ZS=GS1.1.1735797408.36.1.1735797422.0.0.0; __ddg10_=1735797423; __ddg8_=wDnnTSKN1oGBIIdQ"
            }
        });
        const $ = cheerio.load(response.data);
        const images = [];
        $("img[itemprop='image']").each((_, el) => {
            const imgUrl = $(el).attr("src");
            if (imgUrl) images.push(imgUrl);
        });

        if (images.length === 0) {
            return m.reply("gambar tidak ditemukan di halaman itu");
        }
        m.reply(`Ditemukan ${images.length} gambar.`);

        const tempDir = "tmp";
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        for (let i = 0; i < images.length; i++) {
            const imgUrl = images[i];
            const filename = `image_${i + 1}.jpg`;
            const filepath = join(tempDir, filename);
            const imgResponse = await axios.get(imgUrl, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(filepath, imgResponse.data);
        }
        const zipFilename = "komikudl.zip";
        const zipFilepath = zipFilename;
        const output = fs.createWriteStream(zipFilepath);
        const archive = archiver("zip", {
            zlib: {
                level: 9
            }
        });
        output.on("close", async () => {
            await conn.sendFile(m.chat, zipFilepath, zipFilename, "`done`", m);
            setTimeout(() => {
                fs.unlinkSync(zipFilepath);
                fs.rmSync(tempDir, {
                    recursive: true,
                    force: true
                });
            }, 5000);
        });
        archive.on("error", (err) => {
            throw err;
        });
        archive.pipe(output);
        archive.directory(tempDir, false);
        archive.finalize();
    } catch (error) {
        console.error("error:", error.message);
        m.reply("gagal.");
    }
};
handler.help = ["komikudl url"];
handler.tags = ["tools"];
handler.command = /^(komikudl)$/i;
handler.limit = true;
export default handler;