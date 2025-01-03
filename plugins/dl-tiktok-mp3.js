import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un link de Tiktok\n*✧ Ejemplo:* ${usedPrefix}${command} https://vm.tiktok.com/ZMhAk8tLx/`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
  let dp = await d2.json()
      const doc = {
      audio: { url: dp.results.audio },
      mimetype: 'audio/mp4',
      fileName: `ttbykeni.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: text,
          title: dp.results.title,
          sourceUrl: text,
          thumbnail: await (await conn.getFile(dp.results.thumbnail)).data
        }
      }
    };
	await conn.sendFile(m.chat, dp.results.nowm, `${dp.results.title}.mp4`, ``, m, null, rcanal)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
    await conn.sendMessage(m.chat, doc, { quoted: m })
}
handler.help = ['tiktok2']
handler.tags = ['downloader']
handler.command = /^(tt2|tiktok2)$/i
handler.premium = false
handler.register = true
export default handler