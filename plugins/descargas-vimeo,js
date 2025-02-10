import fetch from "node-fetch"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    await m.react('✖️')
    return m.reply("☁️ ingresa el link de un video de Vimeo")
  }

  try {
    await m.react('🕒')

    let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/vimeo-DL?url=${args[0]}`)
    let { title, duration, thumbnail, medias } = await api.json()

    let vid = medias.find(m => m.quality === "240p")?.url

    await conn.sendFile(m.chat, vid, 'video.mp4', title, m)
    await m.react('✅')

  } catch (error) {
    console.error(error)
    await m.react('❌')
  }
}

handler.help = ['vimeo *<url>*'];
handler.tags = ['dl'];
handler.command = ['vimeo']

export default handler
