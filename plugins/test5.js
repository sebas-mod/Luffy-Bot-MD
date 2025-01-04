import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

const handler = async (m, { conn }) => {
    try {
        const tempFilePath = path.resolve('./temp-image.jpg'); // Ruta temporal para el archivo
        const thumbnailUrl = 'https://telegra.ph/file/61d0cf9605cf904f6e5f9.jpg';

        // Descargar la imagen desde la URL
        const response = await axios({ url: thumbnailUrl, responseType: 'arraybuffer' });
        const resizedImage = await sharp(response.data)
            .resize(400, 400)
            .jpeg()
            .toBuffer();

        // Escribir la imagen en un archivo temporal
        fs.writeFileSync(tempFilePath, resizedImage);

        // Obtener el tamaño del archivo temporal
        const { size } = fs.statSync(tempFilePath);

        // Enviar el mensaje con el archivo
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(tempFilePath),
            fileName: 'Sock.jpg', // Nombre del archivo con extensión
            fileLength: size, // Tamaño real del archivo en bytes
            caption: `qq`,
            mimetype: 'image/jpeg', // MIME adecuado para la imagen
            jpegThumbnail: resizedImage, // Miniatura
        }, { quoted: m });

        // Eliminar el archivo temporal después de enviarlo
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al enviar el mensaje.' }, { quoted: m });
    }
};

// Comando asociado
handler.command = ["senddoct"];

export default handler;