import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m, null, fake)

    try {
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`)
        let json = await api.json()
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response
        m.reply(`*${filename}*

- *Tipo :* ${type}
- *Tamaño :* ${size}
- *Creado :* ${uploaded}`)
        await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true })
    } catch (error) {
        console.error(error)
    }
}

handler.command = ['mediafire']

export default handler;