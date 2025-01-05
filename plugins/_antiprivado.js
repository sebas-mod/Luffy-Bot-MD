// Definimos la lista de comandos válidos (modo case-insensitive).
const comandos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i;

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