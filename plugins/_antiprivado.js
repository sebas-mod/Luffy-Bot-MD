const comandos = /\b(piedra|papel|tijera|verificar|code|serbot code|serbot|creadora|grupos|bots|deletebot|eliminarsesion|verify|register|registrar|reg|registroc|deletesesion|registror|jadibot)\b/i;

// Handler base
let handler = (m) => m;

handler.before = async function (m, { conn, isOwner, isROwner, prefix }) {
  // Ignorar si el mensaje no contiene texto.
  if (!m.text) return true;

  // Permitir si el mensaje es del bot o de un Owner/ROwner.
  if (m.fromMe || isOwner || isROwner) return true;

  // Configuración del bot en la base de datos.
  const bot = global.db?.data?.settings?.[this.user.jid] || {};

  // Ignorar mensajes privados si el antiPrivate está activado.
  if (bot.antiPrivate && !m.isGroup) return false;

  // Verificar si el mensaje coincide con un comando permitido.
  const prefixStr = typeof prefix === 'string' ? `^${prefix}\\s?` : prefix.source;
  const regexWithPrefix = new RegExp(`${prefixStr}${comandos.source}`, 'i');

  // Ejecutar si coincide con el comando, ignorar de lo contrario.
  return regexWithPrefix.test(m.text.trim());
};

export default handler;


/* export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
if (m.chat === '120363310433406751@newsletter') return !0
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`《✧》Hola @${m.sender.split`@`[0]}, mi creador a desactivado los comandos en los chats privados el cual serás bloqueado, si quieres usar los comandos del bot te invito a que te unas al grupo principal del bot.\n\n${grupo}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
} */