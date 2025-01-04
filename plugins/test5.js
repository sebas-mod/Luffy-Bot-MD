import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

const handler = async (m, { conn }) => {
    try {
        const filePath = path.resolve('./package.json');
        const thumbnailUrl = 'https://telegra.ph/file/61d0cf9605cf904f6e5f9.jpg';

        // Verificar si el archivo existe
        if (!fs.existsSync(filePath)) {
            await conn.sendMessage(m.chat, { text: 'El archivo package.json no fue encontrado.' }, { quoted: m });
            return;
        }

        // Descargar y redimensionar la miniatura
        const response = await axios({ url: thumbnailUrl, responseType: 'arraybuffer' });
        const resizedThumbnail = await sharp(response.data)
            .resize(400, 400)
            .jpeg()
            .toBuffer();

        // Enviar el mensaje con el documento
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(filePath),
            fileName: 'Sock',
            fileLength: "99999999999",
            pageCount: "2024",
            caption: `qq`,
            mimetype: 'application/json', // Cambiar a image/png si el archivo lo requiere
            jpegThumbnail: resizedThumbnail,
        }, { quoted: m });
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al enviar el mensaje.' }, { quoted: m });
    }
};

// Comando asociado
handler.command = ["senddoct"];

export default handler;