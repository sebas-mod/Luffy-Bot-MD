import fetch from 'node-fetch';
import yts from 'yt-search';

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

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
    // Buscar el video usando la función personalizada search
    let ytres = await search(text);
    let video = ytres[0]; // Usamos el primer video de los resultados

    // Obtener la miniatura del video
    let img = await (await fetch(video.image)).buffer(); // Descargamos la imagen

    // Obtener la URL del video y realizar la solicitud a la API externa
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${video.url}`);
    let json = await api.json();

    if (!json.result) {
      return conn.reply(m.chat, `❀ No se pudo obtener el archivo de audio de YouTube.`, m);
    }

    let dl_url = json.result.download.url;
    let quality = json.result.download.quality;

    // Verificación de la URL de descarga
    if (!dl_url) {
      return conn.reply(m.chat, `❀ Error: No se pudo obtener el archivo de audio.`, m);
    }

    await m.react('✅');

    // Enviar el archivo de audio como documento con miniatura
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      fileName: `${video.title}.mp3`,
      fileLength: quality,
      caption: `❀ ${video.title}`,
      mimetype: 'audio/mpeg',
      jpegThumbnail: img, // Usamos la miniatura descargada
    }, { quoted: m });

    // Enviar como audio directamente
    await conn.sendMessage(m.chat, { 
      audio: { url: dl_url }, 
      fileName: `${video.title}.mp3`, 
      mimetype: 'audio/mp4' 
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❀ Ocurrió un error al procesar la solicitud.`, m);
  }
};

handler.command = ['ytmp3v2'];

export default handler;