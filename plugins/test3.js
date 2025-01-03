

import https from "https"

let handler = async (m, { conn, args }) => {
    let text
    if (args.length >= 1) {
        text = args.join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Hello there! How can I assist you today?"

    if (!global.db.data.ai) global.db.data.ai = {}
    if (!global.db.data.ai[m.sender]) {
        let no = Math.floor(1000 + Math.random() * 9000)
        global.db.data.ai[m.sender] = `ai-${no}`
        await m.reply(`✨ Sesi AI Chat telah dibuat!\nID Anda: ${global.db.data.ai[m.sender]}\nGunakan sesi ini untuk berinteraksi dengan AI.`)
    }
    let id = global.db.data.ai[m.sender]
    https.get(`https://api.zenkey.my.id/api/openai/ai4o?text=${encodeURIComponent(text)}&apikey=zenkey&userId=${id}`, res => {
        let data = ''
        res.on('data', chunk => {
            data += chunk
        })
        res.on('end', async () => {
            try {
                let ress = JSON.parse(data)
                let result = ress.result 
                await m.reply(result)
            } catch {
                await m.reply("Terjadi kesalahan.")
            }
        })
    }).on('error', async e => {      
        throw e
    })
}
/* ganti dengan nomorbot kmu:v */
handler.customPrefix = /^(@628Xxxxx)$/i 
handler.command = new RegExp

export default handler