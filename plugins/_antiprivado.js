const comandos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i;

let handler = m => m;
handler.before = async function (m, { conn, isOwner, isROwner }) {
    if (m.fromMe) return true;
    if (m.isGroup) return false;
    if (!m.message) return true;

    const regexWithPrefix = new RegExp(`^${prefix.source}\\s?${comandos.source}`, 'i');
    if (regexWithPrefix.test(m.text.toLowerCase().trim())) return true;

    let chat, user, bot, mensaje;
    chat = global.db.data.chats[m.chat];
    user = global.db.data.users[m.sender];
    bot = global.db.data.settings[this.user.jid] || {};

    if (bot.antiPrivate && !isOwner && !isROwner) {
        return false;
    }

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
