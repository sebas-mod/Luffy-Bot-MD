import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]

if (!text) throw `𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️\n𝗨𝘀𝗲𝗿 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼\n*${usedPrefix + command} Loli*`

const res = await googleImage(text)
let image = res.getRandom()
let link = image
await delay(1000)
conn.sendFile(m.chat, link, 'error.jpg', `*🔎 Resultado De: ${text}*\n ${dev}`, m);

// conn.sendButton(m.chat, `Resultado de : ${text}`, wm, link, [['SIGUIENTE', `/imagen ${text}`]], null, null, m)
}
handler.help = ['imagen <texto>']
handler.tags = ['internet', 'tools']
handler.command = /^(image|imagen)$/i

export default handler
const delay = time => new Promise(res => setTimeout(res, time))