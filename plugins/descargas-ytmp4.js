/* 
- Downloader Ytmp4 By Izumi-kzx
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖');
  if (!text) throw Proporcióname el enlace de YouTube para que pueda ayudarte. 🎥;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo';
    const response = await fetch(https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey});
    const result = await response.json();

    if (result.status && result.result && result.result.mp4) {
      const { title, thumb, mp4, duration } = result.result;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: mp4 },
          mimetype: 'video/mp4',
          caption: *🍟 Título:* ${title}\n*🍟 Duración:* ${Math.floor(duration / 60)}:${duration % 60} minutos,
          thumbnail: await (await fetch(thumb)).buffer(),
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Error: No se pudo obtener el archivo MP4');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(❌ *Error:* ${error.message || 'Ocurrió un error desconocido'});
  }
};

handler.help = ['ytmp4 <url>'];
handler.command = ['ytmp4'];
handler.tags = ['dl'];

export default handler;
