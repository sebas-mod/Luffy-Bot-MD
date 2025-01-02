import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Ingresa el link de un video/imagen de pinterest', m)
  await m.react('🕓');
  }

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/pinterestdl?apikey=gifted&url=${text}`)
    let res = await api.json()
    let json = res.result

    if (Array.isArray(json.media)) {
      for (let media of json.media) {
        if (media.format === "JPG") {
          await conn.sendFile(m.chat, media.download_url, 'Imagen.jpg', `✰ ${json.title}`, m)
        } else if (media.format === "MP4") {
          await conn.sendFile(m.chat, media.download_url, 'Video.mp4', `✰ ${json.title}`, m)
        }
      }
    } else {
      let media = json.media
      if (media.format === "JPG") {
        await m.react('✅');
        await conn.sendFile(m.chat, media.download_url, 'Imagen.jpg', `✰ ${json.title}`, m)
      } else if (media.format === "MP4") {
        await conn.sendFile(m.chat, media.download_url, 'Video.mp4', `✰ ${json.title}`, m)
      }
    }

  } catch (error) {
    console.error(error)
  }
}

handler.command = /^(pinterestdl)$/i

export default handler