// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`)
let json = await api.json()

let { title, image } = json.result
// let title = json.result.metadata.title
let dl_url = json.result.download.url
await m.react('✅');
await conn.sendMessage(m.chat, { audio: { url: url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

} catch (error) {
console.error(error)
}}

handler.command = ['ytmp3v2']

export default handler