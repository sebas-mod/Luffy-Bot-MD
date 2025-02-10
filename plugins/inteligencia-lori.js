/* 
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🍟 LORI AI ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `🍟 Ingresa un texto para hablar con Lori Ai`, m)
try {
let api = await fetch(`https://api.davidcyriltech.my.id/ai/lori?text=${encodeURIComponent(text)}`)
let json = await api.json()
if (json.success) await m.reply(json.response)
else await m.reply(`🍟 Hubo un error al obtener la respuesta.`)
} catch (error) {
console.error(error)
await m.reply(`🍟 Ocurrió un error al procesar tu solicitud.`)
}}
handler.help = ['lori *<texto>*']
handler.tags = ['ai']
handler.command = ['loriai', 'lori'];

export default handler
