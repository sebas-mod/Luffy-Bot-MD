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
    const str = `𝘿𝙍𝙄𝙑𝙀 𝘿𝙕𝙉

https://drive.google.com/drive/folders/1FAfu6Uo-0Knb2bHhkW2i3E8jur0U6rCg?usp=drive_link

https://drive.google.com/drive/folders/1HSpLL2ZRBvp27nTDbOu6E_e34f14iya-?usp=drive_link

https://drive.google.com/drive/folders/12BiQyo6bND39l-MPcBuBpew971FhDH4L?usp=drive_link

https://drive.google.com/drive/folders/1f89ZKrAcbcoVrxnt-WbeMznQjIJ-JMeV?usp=drive_link

https://drive.google.com/drive/folders/1SwEHRSH4qdN2N9Mb-F7gTW3V3_BVmZh1?usp=drive_link

https://drive.google.com/drive/folders/10gNjIs4Ko8ze_iBa5ganuCOMelY6UZhY?usp=drive_link

https://drive.google.com/drive/folders/1T-i81Te3y6seNctxw09THjrwYo-DhYV_?usp=drive_link

https://drive.google.com/drive/folders/1kmcNyCDe4-ZIV6gp1iKRv-4JDUnUGQll?usp=drive_link

https://drive.google.com/drive/folders/1AHuoeHbh-9jA3qwC0yNNnXQcs9sQOa1P?usp=drive_link

https://drive.google.com/drive/folders/1TxlDi3KPfgC63mMekHhtkr9Uz-fo_hPa?usp=drive_link

https://drive.google.com/drive/folders/1wSLLwCDHxtozUatdLWxVN_qgSzfBjqPR?usp=drive_link

https://drive.google.com/drive/folders/1QT_drbbniUDnG8HtqSbUS-tTu8H7esxr?usp=drive_link

https://drive.google.com/drive/folders/1U4nD1nUrZXWLPnCbRYPyZDJ2bwZnfRJH?usp=drive_link

https://drive.google.com/drive/folders/1iWz9NwDSTj4XV919o99q7LXgQtnZq_0n?usp=drive_link

https://drive.google.com/drive/folders/1NlDd-QqQg19NcrHQUwgygqkmguTUWiv3?usp=drive_link

https://drive.google.com/drive/folders/1--crd_xbKMlNUDAEj2kxOAD0avH6mQL6?usp=drive_link

https://drive.google.com/drive/folders/1NTPiU2WxBRZIufiHFWsnnjz_kLiyLs45?usp=drive_link

https://drive.google.com/drive/folders/1JrzERNZboWx5Z_Wn4rzTLKOnEQGuI2ww?usp=drive_link

https://drive.google.com/drive/folders/1ct2yj3oPvahNsvZc4yd3VWo9N_ZhDdm1?usp=drive_link

𝘽𝙔 𝙇𝙪𝙛𝙛𝙮-𝘽𝙤𝙩

𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼

𝙚𝙡 𝙙𝙧𝙞𝙫𝙚 𝙡𝙡𝙚𝙫𝙖 𝙪𝙣𝙖 𝙘𝙖𝙣𝙩𝙞𝙙𝙖𝙙 𝙙𝙚 𝙧𝙚𝙘𝙪𝙧𝙨𝙤𝙨 𝙙𝙯𝙣🍿`.trim();

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

handler.help = ['dzn'];
handler.tags = ['apk'];
handler.command = /^(dzn)$/i;

export default handler;

// Función para calcular el tiempo de actividad
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
