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

// *[ ❀ GEMINI ]*
import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
if (!text) {
return conn.reply(m.chat, `❀ Ingresa un texto para hablar con Gemini`, m)
}
    
try {
let api = await fetch(`https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${text}`)
let json = await api.json()
await m.reply(json.result)
} catch (error) {
console.error(error)    
}}

handler.command = /^(gemini)$/i

export default handler