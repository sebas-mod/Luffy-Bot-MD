import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m);

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
    let json = await api.json();

    let { title, thumbnail, description, timestamp, ago, views, author } = json.result;
    let img = await (await fetch(thumbnail)).buffer();
    let dl_url = json.result.download.url;
    let quality = json.result.download.quality;
    
    await m.react('✅');

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
  }
};

handler.command = ['ytmp3v2'];

export default handler;