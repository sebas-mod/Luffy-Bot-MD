import fetch from "node-fetch"

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        await m.react('✖️')
        return conn.reply(m.chat, '☁️ Ingresa un enlace de videy.', m, fake);
    }

    try {
        await m.react('🕑')
        let api = await fetch(`https://api.agatz.xyz/api/videydl?url=${args[0]}`)
        let json = await api.json()
        let { data } = json

        await conn.sendFile(m.chat, data, 'video.mp4', '> [ V I D E Y - D E SC A R G A S ]\n', m)
        await m.react('✅')
    } catch (error) {
        console.error(error)
        await m.react('❌')
    }
}

handler.help = ['videydl *<url>*'];
handler.tags = ['dl'];
handler.command = ['videydl'];

export default handler
