import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, '❀ Ingresa el link de una cancion de spotify', m)
await m.react('🕓');
    }

    try {
        let api = await fetch(`https://api.giftedtech.my.id/api/download/spotifydl?apikey=gifted&url=${text}`)
        let json = await api.json()
        let { quality, title, duration, thumbnail, download_url: dl_url } = json.result

        let songInfo = `- *Titulo :* ${title}
- *Calidad :* ${quality}
- *Duracion :* ${duration}`

        await m.react('✅');
        await conn.sendFile(m.chat, thumbnail, 'SpotifyThumbnail.jpg', songInfo, m)
        await conn.sendMessage(m.chat, { 
            audio: { url: dl_url }, 
            fileName: `${title}.mp3`, 
            mimetype: 'audio/mp4' 
        }, { quoted: m })
    } catch (error) {
        console.error(error)
    }
}

handler.help = ['spotify *<url>*']
handler.tags = ['dl']
handler.command = ['spotify']

export default handler;
