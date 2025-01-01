import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import fetch from 'node-fetch';

let handler = (m) => m;
handler.before = async function (m, { conn }) {
  if (!db.data.chats[m.chat].autolevelup) return;

  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;

  let pp = await conn
    .profilePictureUrl(who, 'image')
    .catch((_) => 'https://pomf2.lain.la/f/rycjgv2t.jpg');

  let img = null;
  try {
    img = await (await fetch(pp)).buffer();
  } catch (err) {
    console.error('Error al obtener la imagen:', err);
    img = null;
  }

  let name = await conn.getName(m.sender);
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];
  if (!chat.autolevelup) return true;

  let level = user.level;
  let before = user.level * 1;

  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const roles = global.roles;
    let role = Object.keys(roles).reduce((acc, key) => {
      if (roles[key] <= user.level) acc = key;
      return acc;
    }, '🌱 *Aventurero(a) - Novato(a) V*'); // Rol por defecto si no encuentra uno

    let text = `✨ *¡Felicidades ${name}!*\n\n` +
      `🎯 *Nuevo nivel alcanzado:*\n` +
      `- Nivel previo: ${before}\n` +
      `- Nivel actual: ${user.level}\n` +
      `- Rol actual: ${role}`;

    await conn.sendFile(
      m.chat,
      img || 'https://pomf2.lain.la/f/rycjgv2t.jpg',
      'thumbnail.jpg',
      `🎉 *¡Subiste de nivel!*\n\n` +
      `◪ *Nombre:* ${name}\n` +
      `├◆ *Rol:* ${role}\n` +
      `├◆ *Exp:* ${user.exp} xp\n` +
      `╰◆ *Nivel:* ${before} ➠ ${user.level}`.trim(),
      m
    );
  }
};
export default handler;

// Definición de roles por nivel
global.roles = {
  '🌱 Novato I': 0,
  '🌱 Novato II': 2,
  '🌱 Novato III': 4,
  '🌱 Novato IV': 6,
  '🌱 Novato V': 8,
  '🛠️ Aprendiz I': 10,
  '🛠️ Aprendiz II': 12,
  '🛠️ Aprendiz III': 14,
  '🛠️ Aprendiz IV': 16,
  '🛠️ Aprendiz V': 18,
  '⚔️ Explorador I': 20,
  '⚔️ Explorador II': 22,
  '⚔️ Explorador III': 24,
  '⚔️ Explorador IV': 26,
  '⚔️ Explorador V': 28,
  '🏹 Guerrero I': 30,
  '🏹 Guerrero II': 32,
  '🏹 Guerrero III': 34,
  '🏹 Guerrero IV': 36,
  '🏹 Guerrero V': 38,
  '🛡️ Guardián I': 40,
  '🛡️ Guardián II': 42,
  '🛡️ Guardián III': 44,
  '🛡️ Guardián IV': 46,
  '🛡️ Guardián V': 48,
  '🔮 Mago I': 50,
  '🔮 Mago II': 52,
  '🔮 Mago III': 54,
  '🔮 Mago IV': 56,
  '🔮 Mago V': 58,
  '🏅 Héroe I': 60,
  '🏅 Héroe II': 62,
  '🏅 Héroe III': 64,
  '🏅 Héroe IV': 66,
  '🏅 Héroe V': 68,
  '💎 Paladín I': 70,
  '💎 Paladín II': 72,
  '💎 Paladín III': 74,
  '💎 Paladín IV': 76,
  '💎 Paladín V': 78,
  '🌌 Maestro I': 80,
  '🌌 Maestro II': 85,
  '🌌 Maestro III': 90,
  '🌌 Maestro IV': 95,
  '🌌 Maestro V': 99,
  '🌀 Leyenda I': 100,
  '🌀 Leyenda II': 110,
  '🌀 Leyenda III': 120,
  '🌀 Leyenda IV': 130,
  '🌀 Leyenda V': 140,
  '👑 Rey I': 150,
  '👑 Rey II': 160,
  '👑 Rey III': 170,
  '👑 Rey IV': 180,
  '👑 Rey V': 199,
  '🚀 Campeón I': 200,
  '🚀 Campeón II': 225,
  '🚀 Campeón III': 250,
  '🚀 Campeón IV': 275,
  '🚀 Campeón V': 299,
  '✨ Luz I': 300,
  '✨ Luz II': 325,
  '✨ Luz III': 350,
  '✨ Luz IV': 375,
  '✨ Luz V': 399,
  '🪐 Tejedor I': 400,
  '🪐 Tejedor II': 425,
  '🪐 Tejedor III': 450,
  '🪐 Tejedor IV': 475,
  '🪐 Tejedor V': 499,
  '🪞 Reflejo I': 500,
  '🪞 Reflejo II': 525,
  '🪞 Reflejo III': 550,
  '🪞 Reflejo IV': 575,
  '🪞 Reflejo V': 599,
  '🦋 Meta I': 600,
  '🦋 Meta II': 625,
  '🦋 Meta III': 650,
  '🦋 Meta IV': 675,
  '🦋 Meta V': 699,
  '💠 Runas I': 700,
  '💠 Runas II': 725,
  '💠 Runas III': 750,
  '💠 Runas IV': 775,
  '💠 Runas V': 799,
  '🧠 Mente I': 800,
  '🧠 Mente II': 825,
  '🧠 Mente III': 850,
  '🧠 Mente IV': 875,
  '🧠 Mente V': 899,
  '🛸 Viajero I': 900,
  '🛸 Viajero II': 925,
  '🛸 Viajero III': 950,
  '🛸 Viajero IV': 975,
  '🛸 Viajero V': 999,
  '🔥 Héroe I': 1000,
  '🔥 Héroe II': 2000,
  '🔥 Héroe III': 3000,
  '🔥 Héroe IV': 4000,
  '🔥 Héroe V': 5000,
  '👑🌌 Deidad': 10000,
};