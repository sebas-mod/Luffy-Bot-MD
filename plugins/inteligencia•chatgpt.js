import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
if (!text) {
return conn.reply(m.chat, `❀ Ingresa un texto para hablar con Chatgpt`, m)
}
    
try {
let api = await fetch(`https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${text}`)
let json = await api.json()
await m.reply(json.result)
} catch (error) {
console.error(error)    
}}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgptt']

export default handler