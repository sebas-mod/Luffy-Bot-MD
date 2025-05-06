let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('mensaje de bienvenida configurado con exito\n@user (Mencion)\n@subject (Nombre del grupo)\n@desc (Descripcio )')
  } else throw m.reply(y el textl?\n\nejemplo:\n${usedPrefix + command} hola, @user!\nBienvenido al grupo @subject\n\n@desc)
}
handler.help = ['setwelcome <txt>']
handler.tags = ['group']
handler.command = /^(setwelcome|setw)$/i
handler.group = true
handler.admin = true

export default handler
