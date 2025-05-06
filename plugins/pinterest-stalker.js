import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Ingresa el link Threads!');
  try {
    let { data } = await axios.get('https://www.abella.icu/dl-threads?url=' + encodeURIComponent(text));
    if (data.status !== 'success') throw m.reply('No se encontró la data!');
    if (data.data.type === 'image') {
      for (let img of data.data.urls) {
        await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m });
      }
    } else if (data.data.type === 'video') {
      for (let vid of data.data.urls) {
        await conn.sendMessage(m.chat, { video: { url: vid.download_url } }, { quoted: m });
      }
    } else {
      m.reply('El tipo no coincide con la deacarga');
    }
  } catch (e) {
    m.reply('Error : ' + e);
  }
};

handler.help = ['threads'].map(v => v + ' ');
handler.command = ['threads'];
handler.tags = ['descargas']

export default handler;
