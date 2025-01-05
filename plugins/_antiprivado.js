export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('bots')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`*[❗] Hola @${m.sender.split`@`[0]}, Esta prohibido hablar al privado del bot pero si deseas comprarlo habla a los siguientes numeros \nhttps://walink.co/62efd1\nhttps://walink.co/6ecb77*`, false, {mentions: [m.sender]});
    // await this.updateBlockStatus(m.chat, 'block'); // Línea eliminada o comentada
  }
  return !1;
}