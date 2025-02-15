import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { generateWAMessageFromContent, proto, getDevice } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  let calaveras = '☠️';

  let tags = {
    "main": "🌟 「 *`PRINCIPAL`* 」 🌟",
    "info": "ℹ️ 「 *`INFORMACION`* 」 ℹ️",
    "search": "🔍 「 *`SEARCH`* 」 🔍",
    "rpg": "🎮 「 *`RPG`* 」 🎮",
    "nable": "🟢 「 *`ON - OFF`* 」 🔴",
    "start": "🚀 「 *`START`* 」 🚀",
    "sticker": "🖼️ 「 *`STICKER`* 」 🖼️",
    "dl": "📥 「 *`DOWNLOADER`* 」 📥",
    "ai": "🧠 「 *`INTELIGENCIAS`* 」 🧠",
    "tools": "🛠️ 「 *`TOOLS`* 」 🛠️",
    "anonymous": "🙈 「 *`ANONYMOUS`* 」 🙈",
    "confesar": "🤫 「 *`CONFESIONES`* 」 🤫",
    "internet": "🌐 「 *`INTERNET`* 」 🌐",
    "anime": "🌸 「 *`ANIME`* 」 🌸",
    "group": "👥 「 *`GROUP`* 」 👥",
    "owner": "👑 「 *`OWNER`* 」 👑",
    "audios": "🤖「 *`MODIFICADOR DE VOZ`* 」🤖",
    "nsfw": "🔞 「 *`+18`* 」🔞 ",
  }

  try {
    let tag = `@${m.sender.split('@')[0]}`
    let mode = global.opts['self'] || global.opts['owneronly'] ? 'Private' : 'Public'
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium' : 'Free'}`
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let text = `
      *${ucapan()} ${name}*
      │♛ _\`ACTIVO\`_ :: %muptime
      │♛ _\`USUARIOS\`_ :: _${rtotalreg} de ${totalreg}_
      │♛ _\`CALAVERAS\`_ :: _${calaveras}_
      │♛ _\`PREFIJO\`_ :: _< . >_
      │♛ _\`TOTAL COMANDOS\`_ :: _%totalf_
    `;

    let img = 'https://files.catbox.moe/uc846d.jpeg'
    await m.react('☠️')
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: text,
      footer: 'Bot Menu',
      buttons: [
        { buttonId: `.ping`, buttonText: { displayText: 'PING' } },
        { buttonId: `.owner`, buttonText: { displayText: 'OWNER' } },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, 'Error en el menú', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|menú|\?)$/i
handler.register = true
handler.exp = 3

export default handler

function ucapan() {
    const time = moment.tz('America/Buenos_Aires').format('HH')
    let res = "Buenas Noches🌙"
    if (time >= 5) res = "Buena Madrugada🌄"
    if (time > 10) res = "Buenos días☀️"
    if (time >= 12) res = "Buenas Tardes🌅"
    if (time >= 19) res = "Buenas Noches🌙"
    return res
}
