import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { tmpdir } from 'os';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para validar URL
const isUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

const handler = async (m, { text, conn, args }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '☁️ Te Faltó El Texto!',
        }, { quoted: m });
    }

    try {
        let stiker;
        if (isUrl(args[0])) {
            // Si es una URL, utiliza la función de sticker con nombre personalizado
            stiker = await sticker(false, args[0], global.sticker2, global.sticker1);
        } else {
            // Genera el sticker basado en texto
            const buffer = await fetchSticker(text);
            const outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.webp`);
            await sharp(buffer)
                .resize(512, 512, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .webp({ quality: 80 })
                .toFile(outputFilePath);

            stiker = { url: outputFilePath };
        }

        // Envía el sticker con nombre basado en global.sticker2 y global.sticker1
        await conn.sendMessage(m.chat, {
            sticker: stiker,
            contextInfo: {
                externalAdReply: {
                    title: global.sticker2 || "Sticker Personalizado",
                    body: global.sticker1 || "Creado por Bot",
                    mediaType: 2,
                },
            },
        }, { quoted: m });

        if (!isUrl(args[0])) {
            // Si se generó un archivo temporal, eliminarlo después de enviarlo
            fs.unlinkSync(stiker.url);
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `Hubo un error 😪`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto o URL>*'];

export default handler;







/* import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
    tmpdir
} from 'os';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: {
                q: text
            },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

const handler = async (m, {
    text,
    conn
}) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '☁️ Te Faltó El Texto!',
        }, {
            quoted: m
        });
    }

    try {
        const buffer = await fetchSticker(text);
        const outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.webp`);
        await sharp(buffer)
            .resize(512, 512, {
                fit: 'contain',
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 0
                }
            })
            .webp({
                quality: 80
            })
            .toFile(outputFilePath);

        await conn.sendMessage(m.chat, {
            sticker: {
                url: outputFilePath
            },
        }, {
            quoted: fkontak
        });
        fs.unlinkSync(outputFilePath);
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `Hubo un error 😪`,
        }, {
            quoted: m
        });
    }
};
handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler; */