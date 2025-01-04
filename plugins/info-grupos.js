import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://i.ibb.co/1djcb0T/file.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D*

1- Génesis Ultra ☁️
*✰* https://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX

*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*

➠ Enlace anulado? entre aquí! 

♡ Canal Genesis :
*✰* https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y

♡ Canal TK-Host :
*✰* https://whatsapp.com/channel/0029VaGGynJLY6d43krQYR2g

> ${dev}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, fake)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler