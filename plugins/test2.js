import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!mime) {
    return m.reply('🚩 Responde a un archivo válido (imagen, video, etc.).');
  }

  await m.react('🕓');

  let media = await q.download();
  let extension = mime.split('/')[1]; // Obtiene la extensión (ejemplo: jpg, mp4)
  let filename = `file.${extension}`; // Nombre del archivo con extensión
  let formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('fileToUpload', media, filename);

  try {
    let response = await axios.post('https://catbox.moe/user/api.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status === 200) {
      let baseUrl = response.data.trim(); // URL base sin la extensión
      let fullUrl = `${baseUrl}.${extension}`; // Agrega la extensión al final

      let txt = `*乂 C A T B O X  -  U P L O A D E R*\n\n`;
      txt += `  *» Titulo* : ${filename}\n`;
      txt += `  *» Mime* : ${mime}\n`;
      txt += `  *» Enlace* : ${fullUrl}\n\n`;
      txt += `🚩 *${textbot}*`;

      await conn.sendFile(m.chat, fullUrl, filename, txt, m, null, rcanal);
      await m.react('✅');
    } else {
      await m.react('✖️');
      m.reply('❌ Error al subir el archivo a Catbox.moe.');
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    m.reply('❌ Error al intentar subir el archivo.');
  }
};

handler.tags = ['tools'];
handler.help = ['catbox'];
handler.command = /^(catbox)$/i;
handler.register = true;
export default handler;