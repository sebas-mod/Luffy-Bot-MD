// Definimos la lista de comandos válidos (modo case-insensitive).
const comandos = /piedra|papel|tijera|verificar|code|serbot code|serbot|creadora|grupos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|registroc|deletesesion|registror|jadibot/i;

// Handler base
let handler = (m) => m;

handler.before = async function (m, { conn, isOwner, isROwner, prefix }) {
  // 1) Ignoramos si no hay texto (por ejemplo, stickers, imágenes, etc.).
  if (!m.message) return true;

  // 2) Si eres tú (fromMe) o eres Owner/ROwner, deja que pase todo.
  if (m.fromMe || isOwner || isROwner) {
    return true;
  }

  // 3) Si eres usuario normal, revisamos si está activado el antiPrivate.
  //    Obtenemos la config del bot en la DB
  const botSettings = global.db.data.settings[this.user.jid] || {};
  if (botSettings.antiPrivate && !m.isGroup) {
    // En caso de estar en privado y antiPrivate activado,
    // simplemente ignoramos retornando "false".
    return false;
  }

  // 4) Si llegamos aquí, o no está activo antiPrivate, o el chat es grupo.
  //    Revisa si el mensaje es un comando permitido con el prefijo.
  //    - Ajusta la parte de prefix según sea RegExp o string.
  //    - Si prefix es un string, en lugar de prefix.source usarías: `^${prefix}\s?${comandos.source}`
  const regexWithPrefix = new RegExp(`^${prefix.source}\\s?${comandos.source}`, 'i');

  // 5) Si coincide con un comando permitido, se ejecuta.
  if (regexWithPrefix.test(m.text.toLowerCase().trim())) {
    return true;
  }

  // 6) Si no coincide, ignoramos sin bloquear ni advertir.
  return false;
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