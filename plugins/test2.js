import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.dafont.com/",
    "Cookie": "PHPSESSID=57to1j7l3q2bm4jj8cp3hjcnp7; _ga=GA1.1.735222474.1735736599; __eoi=ID=80f4924dca104d55:T=1725101280:RT=1735736599:S=AA-Afjafx9HUtWtBeU58TBZaba6w; _ga_W3Z15Z4TYR=GS1.1.1735736598.1.1.1735736606.0.0.0; __gads=ID=6fc638e356053a5a:T=1725853453:RT=1735736606:S=ALNI_MYOTnA2MElBW5CpGSLOZxjmjCxp7Q; __gpi=UID=00000ef5a81aa477:T=1725853453:RT=1735736606:S=ALNI_MYOYl4xhjvabA08qVlVrfYhbdWxTg"
};
async function searchFonts(query) {
    try {
        const searchUrl = `https://www.dafont.com/search.php?q=${encodeURIComponent(query)}`;
        const {
            data
        } = await axios.get(searchUrl, {
            headers: HEADERS
        });
        const $ = cheerio.load(data);
        const results = [];

        $("div.preview a").each((_, el) => {
            const relativeUrl = $(el).attr("href");
            if (relativeUrl) {
                const fullUrl = `https://www.dafont.com/${relativeUrl}`;
                results.push(fullUrl);
            }
        });
        if (results.length === 0) {
            throw new Error("Font tidak ditemukan.");
        }

        return results.slice(0, 5);
    } catch (error) {
        console.error("Error saat mencari font:", error.message);
        throw new Error("Gagal mencari font.");
    }
}
async function getDownloadUrl(fontUrl) {
    try {
        const {
            data
        } = await axios.get(fontUrl, {
            headers: HEADERS
        });
        const $ = cheerio.load(data);
        const downloadLink = $("a.dl").attr("href");
        if (!downloadLink) {
            throw new Error("Link download tidak ditemukan!");
        }
        const fullDownloadUrl = downloadLink.startsWith('//') ? `https:${downloadLink}` : downloadLink;
        return fullDownloadUrl;
    } catch (error) {
        console.error("Error mengambil URL download:", error.message);
        throw new Error("Gagal mengambil URL download.");
    }
}
async function downloadFont(zipUrl) {
    try {
        const response = await axios.get(zipUrl, {
            responseType: "arraybuffer",
            headers: HEADERS
        });
        const contentType = response.headers["content-type"];
        if (!contentType || !contentType.includes("application/zip")) {
            throw new Error("File zip gagal!");
        }
        const filePath = path.resolve(process.cwd(), "font.zip");
        fs.writeFileSync(filePath, response.data);
        return filePath;
    } catch (error) {
        console.error("Error mengunduh font:", error.message);
        throw new Error("Gagal mengunduh font.");
    }
}
async function sendFontToUser(filePath, conn, m) {
    try {
        const imageBuffer = fs.readFileSync(filePath);
        await conn.sendMessage(m.chat, {
            document: imageBuffer,
            fileName: "font.zip",
            mimetype: "application/zip",
            caption: "done kan bang?"
        });

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("Error mengirim font:", error.message);
        throw new Error("Gagal mengirim font.");
    }
}
const handler = async (m, {
    conn,
    text
}) => {
    const args = text.split(" ");
    const command = args[0].toLowerCase();
    const query = args.slice(1).join(" ");
    try {
        if (command === "searchfont") {
            if (!query) return m.reply("`nama font?`");

            const searchResults = await searchFonts(query);
            if (searchResults.length === 0) {
                return m.reply("Tidak ada font ditemukan untuk query ini.");
            }
            const resultText = searchResults
                .map((url, index) => `${index + 1}. ${url}`)
                .join("\n");

            await conn.sendMessage(m.chat, {
                text: `*🔍 Hasil pencarian untuk* "- ${query}":\n\n- ${resultText}`,
            });
        } else if (command === "downloadfont") {
            const fontUrl = query.trim();
            if (!fontUrl || !fontUrl.startsWith("https://www.dafont.com")) {
                return m.reply("url yang valid!");
            }
            const downloadUrl = await getDownloadUrl(fontUrl);
            const response = await axios.head(downloadUrl);
            if (response.status !== 200) {
                throw new Error("url tak dapat akses!");
            }

            const zipFilePath = await downloadFont(downloadUrl);
            await sendFontToUser(zipFilePath, conn, m);
        } else {
            m.reply("Gunakan perintah `search` untuk mencari font atau `download` untuk mengunduh font.");
        }
    } catch (error) {
        console.error(error);
        m.reply(error.message);
    }
};
handler.help = ["searchfont font-name", "downloadfont font-url"];
handler.tags = ["downloader"];
handler.command = /^(dafont)$/i;
export default handler;