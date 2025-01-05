import fs from 'fs'

var handler = async (m, { conn, args, command }) => {
    let totalf = Object.values(global.plugins).filter(
        (v) => v.help && v.tags
    ).length;

    let replyMessage = `Total Fitur Bot Saat ini: ${totalf}\n`;

    await conn.reply(m.chat, replyMessage, m)
        contextInfo: {
            externalAdReply: {
                mediaUrl: '',
                mediaType: 2,
                description: dev,
                title: packname,
                body: 'Total Plugins',
                previewType: 0,
                thumbnail: "https://files.catbox.moe/d23slh.jpeg",
                sourceUrl: canal
            }
        }
    });
}

handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']
export default handler