const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🏴‍☠️';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Unir los argumentos para formar el mensaje
  const pesan = args.join(' ');

  // Buscar el enlace del grupo, si está presente, será el último argumento
  const groupLink = args.length > 0 && args[args.length - 1].startsWith('http') ? args.pop() : null;

  const oi = `*» INFO :* ${pesan}`;
  let teks = `*!  MENCION!*\n  *PARA ${participants.length} PARTICIPANTES* 🗣️\n\n ${oi}\n\n╭  ┄ \n`;

  // Aquí construimos la mención a todos los participantes
  for (const mem of participants) {
    teks += `┊${customEmoji} @${mem.id.split('@')[0]}\n`;
  }

  teks += `╰ ━━━━✦❘༻*${vs}*༺❘✦━━━━┛`;

  // Si hay un enlace de grupo, lo añadimos al final del mensaje
  if (groupLink) {
    teks += `\n\nhttps://chat.whatsapp.com/GmFsmsfQm18GGnfRwMeYgQ ${groupLink}`;
  }

  // Enviar el mensaje con menciones
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;
