/* 

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ PINTEREST DL (Imagen/video) ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.reply(m.chat, '❀ Ingresa el link de un video/imagen de pinterest', m)
}

try {
let api = await fetch(`https://api.giftedtech.my.id/api/download/pinterestdl?apikey=gifted&url=${text}`)
let res = await api.json()
let json = res.result

if (Array.isArray(json.media)) {
for (let media of json.media) {
if (media.format === "JPG") {
await conn.sendFile(m.chat, media.download_url, 'HasumiBotFreeCodes.jpg', `✰ ${json.title}`, m)
} else if (media.format === "MP4") {
await conn.sendFile(m.chat, media.download_url, 'HasumiBotFreeCodes.mp4', `✰ ${json.title}`, m)
}}
} else {
let media = json.media
if (media.format === "JPG") {
await conn.sendFile(m.chat, media.download_url, 'HasumiBotFreeCodes.jpg', `✰ ${json.title}`, m)
} else if (media.format === "MP4") {
await conn.sendFile(m.chat, media.download_url, 'HasumiBotFreeCodes.mp4', `✰ ${json.title}`, m)
}}

} catch (error) {
console.error(error)
}}

handler.command = /^(pinterestdl)$/i

export default handler
