import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m);
  }

  // Verifica si el enlace de YouTube es válido
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|e\/|u\/\w\/|.+\/videoseries\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
  if (!urlRegex.test(text)) {
    return conn.reply(m.chat, `❀ El link de YouTube es inválido.`, m);
  }

  try {
    // Realiza la solicitud a la API externa
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
    let json = await api.json();

    if (!json.result) {
      return conn.reply(m.chat, `❀ No se pudo obtener el archivo de audio de YouTube.`, m);
    }

    let { title, imagen, description, timestamp, ago, views, author } = json.result;

    // Verificar si 'imagen' y 'dl_url' son válidos
    if (!imagen || !json.result.download || !json.result.download.url) {
      return conn.reply(m.chat, `❀ Error: URL de imagen o de descarga no disponible.`, m);
    }

    // Obtener la imagen como buffer
    let img = await (await fetch(imagen)).buffer();
    let dl_url = json.result.download.url;
    let quality = json.result.download.quality;

    await m.react('☁️');

    // Enviar como documento
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      fileName: `${title}.mp3`,
      fileLength: quality,
      caption: `❀ ${title}`,
      mimetype: 'audio/mpeg',
      jpegThumbnail: img,
    }, { quoted: m });

    // Enviar como audio
    await conn.sendMessage(m.chat, { 
      audio: { url: dl_url }, 
      fileName: `${title}.mp3`, 
      mimetype: 'audio/mp4' 
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❀ Ocurrió un error al procesar la solicitud.`, m);
  }
};

handler.command = ['ytmp3v2'];

export default handler;