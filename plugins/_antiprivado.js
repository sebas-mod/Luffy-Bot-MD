export async function before(m, {conn, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0; // Ignorar mensajes del bot mismo
  if (m.isGroup) return !1; // Ignorar mensajes en grupos
  if (!m.message) return !0; // Ignorar si no hay mensaje

  // Comandos permitidos en chats privados
  if (
    m.text.includes('PIEDRA') || 
    m.text.includes('PAPEL') || 
    m.text.includes('TIJERA') || 
    m.text.includes('serbot') || 
    m.text.includes('bots')
  ) {
    return !0; // Permitir que funcionen estos comandos
  }

  const bot = global.db.data.settings[this.user.jid] || {};

  // Responder con advertencia y no procesar comandos en privado (excepto los permitidos)
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(
      `《✧》Hola @${m.sender.split`@`[0]}, mi creador ha desactivado los comandos en los chats privados. Te invito a unirte al grupo principal del bot para usarlos:\n\nhttps://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX`, 
      false, 
      {mentions: [m.sender]}
    );
    return !1; // Ignorar cualquier otro comando en privado
  }

  return !1; // Ignorar mensaje
}






/* export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('bots')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
if (m.chat === '120363310433406751@newsletter') return !0
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`《✧》Hola @${m.sender.split`@`[0]}, mi creador a desactivado los comandos en los chats privados el cual serás bloqueado, si quieres usar los comandos del bot te invito a que te unas al grupo principal del bot.\n\nhttps://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
} */
