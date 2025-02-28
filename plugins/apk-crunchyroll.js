import fetch from 'node-fetch';  
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  try {
    const d = new Date(new Date + 3600000);
    const locale = 'es';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    // Texto y enlace que quieres enviar
    const str = `𝙇𝙄𝙉𝙆 𝘿𝙀 𝘾𝙍𝙐𝙉𝘾𝙃𝙔𝙍𝙊𝙇𝙇



𝘽𝙔 𝙇𝙐𝙁𝙁𝙔-𝘽𝙊𝙏

𝐓𝐄𝐗𝐓𝐎🤖

𝙳𝙸𝚂𝙵𝚁𝚄𝚃𝙰 𝙳𝙴𝙻 𝙰𝙿𝙺`.trim();

    // Enviar mensaje con enlace
    const fkontak2 = {
      'key': {
        'participants': '0@s.whatsapp.net',
        'remoteJid': 'status@broadcast',
        'fromMe': false,
        'id': 'Halo'
      },
      'message': {
        'contactMessage': {
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      'participant': '0@s.whatsapp.net'
    };

    // Enviar el mensaje con el enlace
    conn.sendMessage(m.chat, {text: str, mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '𝑫𝒓𝒊𝒗𝒆 𝒆𝒏𝒗𝒊𝒂𝒅𝒐 🍿 𝒔𝒊 𝒏𝒐 𝒔𝒆 𝒆𝒏𝒗𝒊𝒐 𝒓𝒆𝒑𝒐𝒓𝒕𝒂𝒍𝒐 𝒄𝒐𝒏 𝒆𝒍 𝒔𝒕𝒂𝒇𝒇 𝒐 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 𝒅𝒆𝒍 𝒃𝒐𝒕', m);
  }
};

handler.help = ['apkcrunchyroll'];
handler.tags = ['apk'];
handler.command = /^(apkcrunchyroll)$/i;

export default handler;

// Función para calcular el tiempo de actividad
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
