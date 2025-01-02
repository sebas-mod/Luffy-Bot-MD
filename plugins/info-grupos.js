import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D* 🍂

1- Génesis Ultra ☁️
*✰* https://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX

*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*

➠ Enlace anulado? entre aquí! 

♡ Canal Genesis :
*✰* https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y

♡ Canal TK-Host :
*✰* https://whatsapp.com/channel/0029VaGGynJLY6d43krQYR2g

> ${dev}`

await conn.sendFile(m.chat, imagen3, "yaemori.jpg", grupos, fkontak, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = ['grupos', 'aigrupos', 'gruposai']
export default handler
