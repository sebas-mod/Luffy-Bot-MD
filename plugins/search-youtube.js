import fetch from 'node-fetch';
import yts from 'yt-search';
import remini from 'some-image-enhancement-library';  // Asegúrate de tener esta librería o sustituirla por una adecuada

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
    // Obtener la información del video usando yt-search
    const video = await yts(text);
    const { title, thumbnail, url, author, timestamp, views } = video.videos[0];

    // Obtener y mejorar la imagen
    let imageUrl = thumbnail;
    let imageK = await fetch(imageUrl);  // Descargar la miniatura
    let imageB = await imageK.buffer();  // Convertirla a buffer
    
    // Mejorar la imagen (asegúrate de que remini sea la librería adecuada)
    let enhancedImage = await remini(imageB, "enhance");

    // Obtener la URL de descarga (esto depende de la API que estés utilizando)
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`);
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

    // Enviar como documento (usando jpegThumbnail con la imagen mejorada)
    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      fileName: `${title}.mp3`,
      fileLength: quality,
      caption: `❀ ${title}`,
      mimetype: 'audio/mpeg',
      jpegThumbnail: enhancedImage,  // Usamos la imagen mejorada como miniatura
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