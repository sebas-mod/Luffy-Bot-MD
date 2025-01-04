/* 
*❀ By Jtxs*
[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m)

  try {
    let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${text}`)
    let json = await api.json()

    if (!json.status) return conn.reply(m.chat, `❀ Ocurrió un error al procesar el enlace.`, m)

    let title = json.data.download.filename || 'audio'
    let dl_url = json.data.download.url

    await conn.sendMessage(m.chat, { 
      audio: { url: dl_url }, 
      fileName: `${title}`, 
      mimetype: 'audio/mp4' 
    }, { quoted: m })

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, `❀ Ocurrió un error al procesar el enlace.`, m)
  }
}

handler.command = ['ytmp3v3']

export default handler