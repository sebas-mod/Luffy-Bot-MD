// Lista de comandos permitidos (en modo case-insensitive).
const comandos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i;

// Handler base, no hace nada por sí solo.
let handler = (m) => m;

handler.before = async function (m, { conn, isOwner, isROwner, prefix }) {
  // 1) Si no hay mensaje (texto vacío o multimedia), ignoramos.
  if (!m.message) return true;

  // 2) Si el mensaje es tuyo (m.fromMe) o eres Owner/ROwner,
  //    se permite TODO. No se filtra antiprivado ni comandos.
  if (m.fromMe || isOwner || isROwner) {
    return true;
  }

  // 3) Si no eres Owner ni el bot mismo, revisamos el "antiprivado".
  //    Obtenemos la config del bot en la DB para ver si antiPrivate está activo.
  let botSettings = global.db.data.settings[this.user.jid] || {};

  // Si antiPrivate está activo y el chat NO es un grupo, bloqueamos/ignoramos.
  // (Puedes cambiar return false por un bloqueo manual si lo deseas).
  if (botSettings.antiPrivate && !m.isGroup) {
    return false;
  }

  // 4) Si llegamos aquí, es un usuario normal en un chat permitido
  //    (o no está activado antiPrivate, o es grupo, etc.)
  //    Revisamos si el mensaje coincide con el prefijo + algún comando permitido.
  // NOTA: Si 'prefix' es una RegExp, usamos prefix.source. 
  //       Si 'prefix' es un string, ajusta a: `^${prefix}\s?${comandos.source}`
  const regexWithPrefix = new RegExp(`^${prefix.source}\\s?${comandos.source}`, 'i');

  // 5) Si el texto coincide, retornamos true para que se ejecute el comando.
  if (regexWithPrefix.test(m.text.toLowerCase().trim())) {
    return true; 
  }

  // 6) Si no es comando de la lista, ignoramos sin bloquear ni advertir.
  return false;
};

export default handler;






/* export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('bots')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
if (m.chat === '120363310433406751@newsletter') return !0
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`Hola @${m.sender.split`@`[0]}, mi creador a desactivado los comandos en los chats privados el cual serás bloqueado, si quieres usar los comandos del bot te invito a que te unas al grupo principal del bot.\n\nhttps://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX`, false, {mentions: [m.sender]});
//    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
} */
