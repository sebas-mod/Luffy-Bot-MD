import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!mime.startsWith('image/')) {
    return m.reply('🚩 Responde a una *Imagen.*');
  }

  await m.react('🕓');

  let media = await q.download();
  let extension = mime.split('/')[1]; // Obtiene la extensión (ejemplo: jpg, png)
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
      let url = response.data.trim();

      let txt = `*乂 C A T B O X  -  U P L O A D E R*\n\n`;
      txt += `  *» Titulo* : ${filename}\n`;
      txt += `  *» Mime* : ${mime}\n`;
      txt += `  *» Enlace* : ${url}\n\n`;
      txt += `🚩 *${textbot}*`;

      await conn.sendFile(m.chat, url, filename, txt, m, null, rcanal);
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