import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import fetch from 'node-fetch'; // Asegúrate de tener 'node-fetch' instalado.

let handler = (m) => m;
handler.before = async function (m, { conn }) {
  // Verificar si el autolevelup está habilitado en el chat
  if (!db.data.chats[m.chat].autolevelup) return;

  // Obtener ID del usuario o mencionado
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;

  // Obtener la URL de la foto de perfil del usuario
  let pp = await conn
    .profilePictureUrl(who, 'image')
    .catch((_) => 'https://pomf2.lain.la/f/rycjgv2t.jpg'); // URL predeterminada si falla

  // Descargar la imagen y convertirla en buffer
  let img = null;
  try {
    img = await (await fetch(pp)).buffer();
  } catch (err) {
    console.error('Error al obtener la imagen:', err);
    img = null; // En caso de error, asignar nulo
  }

  let name = await conn.getName(m.sender);
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];
  if (!chat.autolevelup) return true;

  let level = user.level;
  let before = user.level * 1;

  // Verificar si el usuario puede subir de nivel
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    // Obtener el rol según el nivel actual
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

    // Enviar mensaje de notificación al canal y al usuario
    await conn.sendMessage(
      global.channelid,
      {
        text: text,
        contextInfo: {
          externalAdReply: {
            title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
            body: '🥳 ¡Alguien obtuvo un nuevo Rango!',
            thumbnail: img || null, // Usar la imagen descargada o ninguna
            sourceUrl: redes,
            mediaType: 1,
            showAdAttribution: false,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: null }
    );

    // Enviar mensaje directo al usuario en el chat
    await conn.sendFile(
      m.chat,
      img || 'https://pomf2.lain.la/f/rycjgv2t.jpg', // Si no hay imagen, usar URL predeterminada
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
  '🌱 Novato V': 0,
  '🌱 Novato IV': 2,
  '🌱 Novato III': 4,
  '🌱 Novato II': 6,
  '🌱 Novato I': 8,
  '🛠️ Aprendiz V': 10,
  '🛠️ Aprendiz IV': 12,
  '🛠️ Aprendiz III': 14,
  '🛠️ Aprendiz II': 16,
  '🛠️ Aprendiz I': 18,
  '⚔️ Explorador V': 20,
  '⚔️ Explorador IV': 22,
  '⚔️ Explorador III': 24,
  '⚔️ Explorador II': 26,
  '⚔️ Explorador I': 28,
  '🏹 Guerrero V': 30,
  '🏹 Guerrero IV': 32,
  '🏹 Guerrero III': 34,
  '🏹 Guerrero II': 36,
  '🏹 Guerrero I': 38,
  '🛡️ Guardián V': 40,
  '🛡️ Guardián IV': 42,
  '🛡️ Guardián III': 44,
  '🛡️ Guardián II': 46,
  '🛡️ Guardián I': 48,
  '🔮 Mago V': 50,
  '🔮 Mago IV': 52,
  '🔮 Mago III': 54,
  '🔮 Mago II': 56,
  '🔮 Mago I': 58,
  '🏅 Héroe V': 60,
  '🏅 Héroe IV': 62,
  '🏅 Héroe III': 64,
  '🏅 Héroe II': 66,
  '🏅 Héroe I': 68,
  '💎 Paladín V': 70,
  '💎 Paladín IV': 72,
  '💎 Paladín III': 74,
  '💎 Paladín II': 76,
  '💎 Paladín I': 78,
  '🌌 Maestro V': 80,
  '🌌 Maestro IV':

/* global.roles = {
  '🌱 *Aventurero(a) - Novato(a) V*': 0,
  '🌱 *Aventurero(a) - Novato(a) IV*': 2,
  '🌱 *Aventurero(a) - Novato(a) III*': 4,
  '🌱 *Aventurero(a) - Novato(a) II*': 6,
  '🌱 *Aventurero(a) - Novato(a) I*': 8,
  '🛠️ *Aprendiz del Camino V*': 10,
  '🛠️ *Aprendiz del Camino IV*': 12,
  '🛠️ *Aprendiz del Camino III*': 14,
  '🛠️ *Aprendiz del Camino II*': 16,
  '🛠️ *Aprendiz del Camino I*': 18,
  '⚔️ *Explorador(a) del Valle V*': 20,
  '⚔️ *Explorador(a) del Valle IV*': 22,
  '⚔️ *Explorador(a) del Valle III*': 24,
  '⚔️ *Explorador(a) del Valle II*': 26,
  '⚔️ *Explorador(a) del Valle I*': 28,
  '🏹 *Guerrero(a) del Alba V*': 30,
  // (Continúan los roles como en tu diseño original)
}; */ 





/* import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = m => m
handler.before = async function (m, { conn, usedPrefix }) {

if (!db.data.chats[m.chat].autolevelup) return
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://pomf2.lain.la/f/rycjgv2t.jpg')
let img = await (await fetch(`${pp}`)).buffer()
let name = await conn.getName(m.sender)
let username = conn.getName(who)
let userName = m.pushName || 'Anónimo'

let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
if (!chat.autolevelup)
return !0

let level = user.level
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) 
user.level++
if (before !== user.level) {
let currentRole = Object.entries(roles).sort((a, b) => b[1] - a[1]) .find(([, minLevel]) => level + 1 >= minLevel)[0]
let nextRole = Object.entries(roles).sort((a, b) => a[1] - b[1]) .find(([, minLevel]) => level + 2 < minLevel)[0]

//if (user.role != currentRole && level >= 1) {
if (level >= 1) {
user.role = currentRole
let text22 = `✨ *¡Felicidades ${userName}!* \n\nTu nuevo rango es:\n» ${currentRole}.\n` + (nextRole ? ` Para llegar al rango:\n» ${nextRole}\nAlcanza el nivel:\n» *${roles[nextRole]}*.` : '')
await conn.sendMessage(global.channelid, { text: text22, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Alguien obtuvo un nuevo Rango!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 
}

await conn.sendFile(m.chat, img, 'thumbnail.jpg', `◪ *Name:* ${name}\n├◆ *Role:* ${user.role}\n├◆ *Exp:* ${exp} xp\n╰◆ *Level:* ${before} ➠ ${user.level}\n`.trim(), m)

// m.reply(`*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n💫 Nivel Actual » *${user.level}*\n🌵 Rango » ${user.role}\n📆 Fecha » *${moment.tz('America/Bogota').format('DD/MM/YY')}*\n\n> *\`¡Has alcanzado un Nuevo Nivel!\`*`)

let especial = 'cookies'
let especial2 = 'exp'
let especial3 = 'money'
let especial4 = 'joincount'

let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6 // Intervalo: 6 a 9
let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant3 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant4 = Math.floor(Math.random() * (3 - 2 + 1)) + 2 // Intervalo: 2 a 3

let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom()
let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'  ].getRandom()
let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom()

let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 
let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom() 
let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 

if (level >= 1) {
let chtxt = `👤 *Usuario:* ${userName}\n🐢 *Nivel anterior:* ${before}\n⭐️ *Nivel actual:* ${level + 1}\n👾 *Rango:* ${user.role}${(level + 1) % 5 === 0 ? `\n\n💰 *Recompensa por alacanzar el nivel ${level + 1}:*
🎁 *Bono:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`
- *${especialCant * (Math.floor(((level + 1) - 5) / 10) + 1)} 🍪 ${especial}*
- *${especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1)} ✨️ ${especial2}*
- *${especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1)} 💸 ${especial3}*
- *${especialCant4 * (Math.floor(((level + 1) - 5) / 10) + 1)} 🪙 ${especial4}*

> 👀 Siguiente recompensa en el *nivel ${level + 6}*` : ''}`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Un usuario obtiene un nuevo nivel!',
thumbnailUrl: perfil, 
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}

if (user.level == 5){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 5!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 10){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 10!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 15){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 15!!* 🏆
ᰔᩚ *${especialCant * 2} ${especial}*
ᰔᩚ *${especialCant2 * 2} ${especial2}*
ᰔᩚ *${especialCant3 * 2} ${especial3}*
ᰔᩚ *${especialCant4 * 2} ${especial4}*`, m)
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2

}else if (user.level == 20){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 20!!* 🏆
ᰔᩚ *${especialCant * 2} ${especial}*
ᰔᩚ *${especialCant2 * 2} ${especial2}*
ᰔᩚ *${especialCant3 * 2} ${especial3}*
ᰔᩚ *${especialCant4 * 2} ${especial4}*`, m)
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2

}else if (user.level == 25){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 25!!* 🏆
ᰔᩚ *${especialCant * 3} ${especial}*
ᰔᩚ *${especialCant2 * 3} ${especial2}*
ᰔᩚ *${especialCant3 * 3} ${especial3}*
ᰔᩚ *${especialCant4 * 3} ${especial4}*`, m)
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3

}else if (user.level == 30){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 30!!* 🏆
ᰔᩚ *${especialCant * 3} ${especial}*
ᰔᩚ *${especialCant2 * 3} ${especial2}*
ᰔᩚ *${especialCant3 * 3} ${especial3}*
ᰔᩚ *${especialCant4 * 3} ${especial4}*`, m)
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3

}else if (user.level == 35){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 35!!* 🏆
ᰔᩚ *${especialCant * 4} ${especial}*
ᰔᩚ *${especialCant2 * 4} ${especial2}*
ᰔᩚ *${especialCant3 * 4} ${especial3}*
ᰔᩚ *${especialCant4 * 4} ${especial4}*`, m)
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4

}else if (user.level == 40){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 40!!* 🏆
ᰔᩚ *${especialCant * 4} ${especial}*
ᰔᩚ *${especialCant2 * 4} ${especial2}*
ᰔᩚ *${especialCant3 * 4} ${especial3}*
ᰔᩚ *${especialCant4 * 4} ${especial4}*`, m)
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4

}else if (user.level == 45){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 45!!* 🏆
ᰔᩚ *${especialCant * 5} ${especial}*
ᰔᩚ *${especialCant2 * 5} ${especial2}*
ᰔᩚ *${especialCant3 * 5} ${especial3}*
ᰔᩚ *${especialCant4 * 5} ${especial4}*`, m)
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5

}else if (user.level == 50){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 50!!* 🏆
ᰔᩚ *${especialCant * 5} ${especial}*
ᰔᩚ *${especialCant2 * 5} ${especial2}*
ᰔᩚ *${especialCant3 * 5} ${especial3}*
ᰔᩚ *${especialCant4 * 5} ${especial4}*`, m)
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5

}else if (user.level == 55){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 55!!* 🏆
ᰔᩚ *${especialCant * 6} ${especial}*
ᰔᩚ *${especialCant2 * 6} ${especial2}*
ᰔᩚ *${especialCant3 * 6} ${especial3}*
ᰔᩚ *${especialCant4 * 6} ${especial4}*`, m)
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6

}else if (user.level == 60){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 60!!* 🏆
ᰔᩚ *${especialCant * 6} ${especial}*
ᰔᩚ *${especialCant2 * 6} ${especial2}*
ᰔᩚ *${especialCant3 * 6} ${especial3}*
ᰔᩚ *${especialCant4 * 6} ${especial4}*`, m)
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6

}else if (user.level == 65){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 65!!* 🏆
ᰔᩚ *${especialCant * 7} ${especial}*
ᰔᩚ *${especialCant2 * 7} ${especial2}*
ᰔᩚ *${especialCant3 * 7} ${especial3}*
ᰔᩚ *${especialCant4 * 7} ${especial4}*`, m)
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7

}else if (user.level == 70){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 70!!* 🏆
ᰔᩚ *${especialCant * 7} ${especial}*
ᰔᩚ *${especialCant2 * 7} ${especial2}*
ᰔᩚ *${especialCant3 * 7} ${especial3}*
ᰔᩚ *${especialCant4 * 7} ${especial4}*`, m)
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7

}else if (user.level == 75){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 75!!* 🏆
ᰔᩚ *${especialCant * 8} ${especial}*
ᰔᩚ *${especialCant2 * 8} ${especial2}*
ᰔᩚ *${especialCant3 * 8} ${especial3}*
ᰔᩚ *${especialCant4 * 8} ${especial4}*`, m) 
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8

}else if (user.level == 80){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 80!!* 🏆
ᰔᩚ *${especialCant * 8} ${especial}*
ᰔᩚ *${especialCant2 * 8} ${especial2}*
ᰔᩚ *${especialCant3 * 8} ${especial3}*
ᰔᩚ *${especialCant4 * 8} ${especial4}*`, m)
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8

}else if (user.level == 85){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 85!!* 🏆
ᰔᩚ *${especialCant * 9} ${especial}*
ᰔᩚ *${especialCant2 * 9} ${especial2}*
ᰔᩚ *${especialCant3 * 9} ${especial3}*
ᰔᩚ *${especialCant4 * 9} ${especial4}*`, m)
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9

}else if (user.level == 90){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 90!!* 🏆
ᰔᩚ *${especialCant * 9} ${especial}*
ᰔᩚ *${especialCant2 * 9} ${especial2}*
ᰔᩚ *${especialCant3 * 9} ${especial3}*
ᰔᩚ *${especialCant4 * 9} ${especial4}*`, m)
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9

}else if (user.level == 95){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 95!!* 🏆
ᰔᩚ *${especialCant * 10} ${especial}*
ᰔᩚ *${especialCant2 * 10} ${especial2}*
ᰔᩚ *${especialCant3 * 10} ${especial3}*
ᰔᩚ *${especialCant4 * 10} ${especial4}*`, m)
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10

}else if (user.level == 100){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 100!!* 🏆
ᰔᩚ *${especialCant * 10} ${especial}*
ᰔᩚ *${especialCant2 * 10} ${especial2}*
ᰔᩚ *${especialCant3 * 10} ${especial3}*
ᰔᩚ *${especialCant4 * 10} ${especial4}*`, m)
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10

}else{        

}

}}                
export default handler

global.roles = {
// Nivel 0-9: Principiantes
'🌱 *Aventurero(a) - Novato(a) V*': 0,
'🌱 *Aventurero(a) - Novato(a) IV*': 2,
'🌱 *Aventurero(a) - Novato(a) III*': 4,
'🌱 *Aventurero(a) - Novato(a) II*': 6,
'🌱 *Aventurero(a) - Novato(a) I*': 8,

// Nivel 10-19: Aprendices
'🛠️ *Aprendiz del Camino V*': 10,
'🛠️ *Aprendiz del Camino IV*': 12,
'🛠️ *Aprendiz del Camino III*': 14,
'🛠️ *Aprendiz del Camino II*': 16,
'🛠️ *Aprendiz del Camino I*': 18,

// Nivel 20-29: Exploradores
'⚔️ *Explorador(a) del Valle V*': 20,
'⚔️ *Explorador(a) del Valle IV*': 22,
'⚔️ *Explorador(a) del Valle III*': 24,
'⚔️ *Explorador(a) del Valle II*': 26,
'⚔️ *Explorador(a) del Valle I*': 28,

// Nivel 30-39: Guerreros
'🏹 *Guerrero(a) del Alba V*': 30,
'🏹 *Guerrero(a) del Alba IV*': 32,
'🏹 *Guerrero(a) del Alba III*': 34,
'🏹 *Guerrero(a) del Alba II*': 36,
'🏹 *Guerrero(a) del Alba I*': 38,

// Nivel 40-49: Guardianes
'🛡️ *Guardián(a) de los Bosques V*': 40,
'🛡️ *Guardián(a) de los Bosques IV*': 42,
'🛡️ *Guardián(a) de los Bosques III*': 44,
'🛡️ *Guardián(a) de los Bosques II*': 46,
'🛡️ *Guardián(a) de los Bosques I*': 48,

// Nivel 50-59: Magos
'🔮 *Mago(a) del Crepúsculo V*': 50,
'🔮 *Mago(a) del Crepúsculo IV*': 52,
'🔮 *Mago(a) del Crepúsculo III*': 54,
'🔮 *Mago(a) del Crepúsculo II*': 56,
'🔮 *Mago(a) del Crepúsculo I*': 58,

// Nivel 60-79: Élite
'🏅 *Héroe(a) de Oro V*': 60,
'🏅 *Héroe(a) de Oro IV*': 62,
'🏅 *Héroe(a) de Oro III*': 64,
'🏅 *Héroe(a) de Oro II*': 66,
'🏅 *Héroe(a) de Oro I*': 68,
'💎 *Paladín(a) de Diamante V*': 70,
'💎 *Paladín(a) de Diamante IV*': 72,
'💎 *Paladín(a) de Diamante III*': 74,
'💎 *Paladín(a) de Diamante II*': 76,
'💎 *Paladín(a) de Diamante I*': 78,

// Nivel 80-99: Maestros
'🌌 *Maestro(a) de las Estrellas V*': 80,
'🌌 *Maestro(a) de las Estrellas IV*': 85,
'🌌 *Maestro(a) de las Estrellas III*': 90,
'🌌 *Maestro(a) de las Estrellas II*': 95,
'🌌 *Maestro(a) de las Estrellas I*': 99,

// Nivel 100-149: Legendarios
'🌀 *Leyenda de la Aurora V*': 100,
'🌀 *Leyenda de la Aurora IV*': 110,
'🌀 *Leyenda de la Aurora III*': 120,
'🌀 *Leyenda de la Aurora II*': 130,
'🌀 *Leyenda de la Aurora I*': 140,

// Nivel 150-199: Reyes/Reinas
'👑 *Rey/Reina del Cosmos V*': 150,
'👑 *Rey/Reina del Cosmos IV*': 160,
'👑 *Rey/Reina del Cosmos III*': 170,
'👑 *Rey/Reina del Cosmos II*': 180,
'👑 *Rey/Reina del Cosmos I*': 199,

// Nivel 200-299: Campeones
'🚀 *Campeón(a) Intergaláctico(a) V*': 200,
'🚀 *Campeón(a) Intergaláctico(a) IV*': 225,
'🚀 *Campeón(a) Intergaláctico(a) III*': 250,
'🚀 *Campeón(a) Intergaláctico(a) II*': 275,
'🚀 *Campeón(a) Intergaláctico(a) I*': 299,

// Nivel 300-399: Luz superior
'✨ *Luz Primigenia del Cosmos V*': 300,
'✨ *Luz Primigenia del Cosmos IV*': 325,
'✨ *Luz Primigenia del Cosmos III*': 350,
'✨ *Luz Primigenia del Cosmos II*': 375,
'✨ *Luz Primigenia del Cosmos I*': 399,

// Nivel 400-499: Tejedor supremo
'🪐 *Tejedor(a) de Órbitas Infinitas V*': 400,
'🪐 *Tejedor(a) de Órbitas Infinitas IV*': 425,
'🪐 *Tejedor(a) de Órbitas Infinitas III*': 450,
'🪐 *Tejedor(a) de Órbitas Infinitas II*': 475,
'🪐 *Tejedor(a) de Órbitas Infinitas I*': 499,

// Nivel 500-599: Reflejo supremo
'🪞 *Reflejo Supremo del Destino V*': 500,
'🪞 *Reflejo Supremo del Destino IV*': 525,
'🪞 *Reflejo Supremo del Destino III*': 550,
'🪞 *Reflejo Supremo del Destino II*': 575,
'🪞 *Reflejo Supremo del Destino I*': 599,

// Nivel 600-699: Metamorfosis
'🦋 *Metamorfosis Astral V*': 600,
'🦋 *Metamorfosis Astral IV*': 625,
'🦋 *Metamorfosis Astral III*': 650,
'🦋 *Metamorfosis Astral II*': 675,
'🦋 *Metamorfosis Astral I*': 699,

// Nivel 700-799: Runas del Destino
'💠 *Gobernante de Runas del Destino V*': 700,
'💠 *Gobernante de Runas del Destino IV*': 725,
'💠 *Gobernante de Runas del Destino III*': 750,
'💠 *Gobernante de Runas del Destino II*': 775,
'💠 *Gobernante de Runas del Destino I*': 799,

// Nivel 800-899: Mente brillante
'🧠 *Mente Universal V*': 800,
'🧠 *Mente Universal IV*': 825,
'🧠 *Mente Universal III*': 850,
'🧠 *Mente Universal II*': 875,
'🧠 *Mente Universal I*': 899,

// Nivel 900-999: Viajero(a)
'🛸 *Viajero(a) del tiempo V*': 900,
'🛸 *Viajero(a) del tiempo IV*': 925,
'🛸 *Viajero(a) del tiempo III*': 950,
'🛸 *Viajero(a) del tiempo II*': 975,
'🛸 *Viajero(a) del tiempo I*': 999,

// Nivel 300+: Inmortales
'🔥 *Héroe(a) Inmortal V*': 1000,
'🔥 *Héroe(a) Inmortal IV*': 2000,
'🔥 *Héroe(a) Inmortal III*': 3000,
'🔥 *Héroe(a) Inmortal II*': 4000,
'🔥 *Héroe(a) Inmortal I*': 5000,
'👑🌌 *Eterna Deidad del Multiverso* ⚡': 10000,
} */