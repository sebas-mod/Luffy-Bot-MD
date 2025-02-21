var handler = async (m) => {

global.db.data.chats[m.chat].isBanned = false;
conn.reply(m.chat, '✅ *Este chat fue desbaneado con éxito*', m, fake, )

}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i

handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler
