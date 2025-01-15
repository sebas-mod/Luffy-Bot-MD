// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m, rcanal)
    
try {
let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`)).json()
let dl_url = api.data.dl

await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp4']

export default handler



/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    await m.react('✖️');
    return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube.`, m, fake);
  }

  try {
    await m.react('🕒');

    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || !json.data || !json.data.download || !json.data.download.url) {
      await m.react('❌');
      return conn.reply(
        m.chat,
        `❌ No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
        m
      );
    }

    let title = json.data.metadata.title || "Sin título";
    let dl_url = json.data.download.url;
    let fileName = json.data.filename || "video";

    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url },
        caption: `🎥 *Título*: ${title}`,
        fileName: `${fileName}.mp4`,
        mimetype: "video/mp4",
      },
      { quoted: m }
    );

    await m.react('✅');

  } catch (error) {
    console.error(error);
    await m.react('❌');
    await conn.reply(
      m.chat,
      `❌ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.`,
      m
    );
  }
};

handler.help = ['ytmp4 *<url>*']
handler.tags = ['dl']
handler.command = ['ytmp4'];
export default handler; */
