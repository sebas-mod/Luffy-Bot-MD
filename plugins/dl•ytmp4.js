import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("🤍 Por favor, ingresa una URL válida de YouTube.")
  }
    await m.react('🕓')

  let ytUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytUrlRegex.test(text)) {
    return m.reply("❀ La URL ingresada no es válida. Asegúrate de que sea un enlace de YouTube.")
  }

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${text}`)
    let json = await api.json()
    let { quality, title, download_url } = json.result

    await m.react('✅')
    await conn.sendMessage(m.chat, { 
      video: { url: download_url }, 
      caption: `_${title}_`, 
      mimetype: 'video/mp4', 
      fileName: `${title}.mp4` 
    }, { quoted: m })
  } catch (error) {
    console.error(error)
    m.reply("❀ Hubo un error al procesar la URL. Inténtalo nuevamente.")
  }
}

handler.help = ['ytmp4 *<link yt>*']
handler.tags = ['dl']
handler.command = ['ytmp4', 'ytv', 'fgmp4']

export default handler