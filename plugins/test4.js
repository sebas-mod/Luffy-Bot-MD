import https from "https"
import { sticker } from "../lib/sticker.js"

let handler = async (m, { conn, text, command }) => {
    if (!global.db) global.db = { data: {} }
    if (!global.db.data.brat) global.db.data.brat = { totalUsage: 0, users: {} }

    let sender = m.sender
    if (!global.db.data.brat.users[sender]) {
        global.db.data.brat.users[sender] = {
            nama: m.pushName || "Hah?",
            nomor: sender.split('@')[0],
            amount: 0
        }
    }

    switch (command) {
        case "brat":
            if (!text) throw "Teksnya mana?"   
            global.db.data.brat.users[sender].amount += 1
            global.db.data.brat.totalUsage += 1
            await m.reply(wait)
            let buffer = await IBuffer(`https://api.zenkey.my.id/api/maker/brat?text=${encodeURIComponent(text)}&apikey=zenkey`)
            let stiker = await sticker(buffer, false, global.packname, global.author)
            if (!stiker) throw "Gagal membuat stiker."
            await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
            break

        case "totalbrat":
            let bratData = global.db.data.brat
            let userStats = Object.entries(bratData.users)
                .map(([id, { nama, amount }]) => `@${id.split('@')[0]}: ${amount} kali`)
                .join("\n")
            let mentions = Object.keys(bratData.users)
            let message = `📊 *Statistik Penggunaan Brat*\n\n*Total Penggunaan:* ${bratData.totalUsage} kali\n\n*Pengguna:*\n${userStats}`
            await conn.sendMessage(m.chat, { text: message, mentions }, { quoted: m })
            break
    }
}

handler.help = ["brat", "totalbrat"]
handler.tags = ["sticker"]
handler.command = /^(bratt|totalbrat)$/i

export default handler

async function IBuffer(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = []
            res.on("data", chunk => data.push(chunk))
            res.on("end", () => resolve(Buffer.concat(data)))
            res.on("error", reject)
        })
    })
}