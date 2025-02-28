import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  try {
    // let vn = './media/menu.mp3'
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
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `𝐋𝐈𝐍𝐊 𝐀𝐏𝐊 𝐃𝐄 𝐒𝐏𝐀𝐌 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏

https://www.mediafire.com/file/elvm4t2m0tf25ux/SPAM_WHATSAPP.apk/file

𝙱𝚈: 𝙻𝚞𝚌𝚔𝚢𝙱𝚘𝚝-𝙼𝙳

𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼⚠️

𝑼𝒔𝒂 𝒆𝒍 𝒂𝒑𝒌 𝒃𝒂𝒋𝒐 𝒕𝒖 𝒑𝒓𝒐𝒑𝒊𝒐 𝒓𝒊𝒆𝒔𝒈𝒐 𝑳𝒖𝒄𝒌𝒚 𝑩𝒐𝒕 𝒏𝒐 𝒔𝒆 𝒉𝒂𝒄𝒆 𝒓𝒆𝒔𝒑𝒐𝒏𝒔𝒂𝒃𝒍𝒆 𝒅𝒆 𝒏𝒊𝒏𝒈𝒖𝒏 𝒕𝒊𝒑𝒐 𝒅𝒆 𝒆𝒓𝒓𝒐𝒓/𝒇𝒂𝒍𝒍𝒂𝒔/𝒃𝒍𝒐𝒒𝒖𝒆𝒐𝒔 𝒑𝒐𝒓 𝒍𝒂 𝒂𝒑𝒑 
𝑫𝒊𝒔𝒇𝒓𝒖𝒕𝒂 𝒍𝒂 𝒂𝒑𝒑 𝒚 𝑬𝒔𝒑𝒆𝒓𝒂𝒎𝒐𝒔 𝒑𝒓𝒐𝒏𝒕𝒐 𝒂𝒈𝒓𝒆𝒈𝒂𝒓 𝒎á𝒔 𝒂𝒑𝒑𝒔 𝒑𝒓𝒆𝒎𝒊𝒖𝒎`.trim();
    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, '𝑨𝒑𝒌 𝒆𝒏𝒗𝒊𝒂𝒅𝒐 📩 𝒔𝒊 𝒏𝒐 𝒔𝒆 𝒆𝒏𝒗𝒊𝒐 𝒓𝒆𝒑𝒐𝒓𝒕𝒂𝒍𝒐 𝒄𝒐𝒏 𝒆𝒍 𝒔𝒕𝒂𝒇𝒇 𝒐 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 𝒅𝒆𝒍 𝒃𝒐𝒕', m);
  }
};

handler.help = ["apkspam"];
handler.tags = ["dl"];
handler.command = ["apkspam"];
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
