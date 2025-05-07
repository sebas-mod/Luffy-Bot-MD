import { sticker } from '../lib/sticker.js' 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(Ejemplo: ${usedPrefix + command} hola mundo)
  let url = https://api.nekorinn.my.id/maker/brat-v2?text=${encodeURIComponent(text)}
  let stiker = await sticker(null, url, 'cmd by', 'kenisawaDev') 
  
  await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}

handler.help = ['brat <texto>']
handler.tags = ['sticker']
handler.command = /^brat$/i
handler.group = false
handler.limit = true

export default handler
