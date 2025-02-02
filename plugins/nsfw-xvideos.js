import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.reply(m.chat, '🚩 *¡Estos comandos están desactivados!*', m, fake);
  await m.react('🕓'); 

  if (!text) throw 'Proporcióname un enlace de video para descargar.';

  try {    
    const apiUrl = `https://dark-core-api.vercel.app/api/download/xvideo?key=user1&url=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.success && data.results && data.results.VideoUrlHigh) {
        const videoUrl = data.results.VideoUrlHigh;

        await conn.sendMessage(m.chat, { 
          video: { url: videoUrl }, 
          mimetype: 'video/mp4' 
        }, { quoted: m });

        await m.react('✅');
      } else {
        throw new Error('No se encontraron resultados');
      }
    } else {
      throw new Error('Error al realizar la solicitud');
    }
  } catch (error) {
    await m.react('❌');  // Reacción de error
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideo'];
handler.tags = ['nsfw'];
handler.command = ['xvideo', 'xvideodownload'];
handler.register = true;

export default handler;
