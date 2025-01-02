/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ MEDIAFIRE ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`)
let json = await api.json()
let { filename, type, size, uploaded, ext, mimetype, download:dl_url } = json.data.response
m.reply(`*${filename}*

- *Tipo :* ${type}
- *Tamaño :* ${size}
- *Creado :* ${uploaded}`)
await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true })

} catch (error) {
console.error(error)
}}

handler.command = ['mediafire']

export default handler;