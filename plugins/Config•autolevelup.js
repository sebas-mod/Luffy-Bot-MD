import { xpRange, canLevelUp, findLevel } from '../lib/levelling.js';
import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m) {
    let user = global.db?.data?.users?.[m.sender];
    if (!user?.autolevelup) return true;

    const { exp, level } = user;
    const { multiplier } = global;
    const { min, xp, max } = xpRange(level, multiplier);

    try {
        let beforeLevel = level;
        while (canLevelUp(level, exp, multiplier)) user.level++;

        if (beforeLevel !== user.level) {
            const newLevel = user.level;
            const role = assignRole(newLevel); // Función para asignar roles según nivel
            user.role = role;

            // Mensaje de notificación
            const message = `🎉 ¡Subiste de nivel!\n👤 Usuario: ${m.sender}\n🌟 Nivel: ${beforeLevel} ➡️ ${newLevel}\n🏅 Nuevo rol: ${role}`;
            await m.reply(message);

            // Aquí va el mensaje personalizado con la información del usuario
            const tag = m.sender;
            const logo = 'https://example.com/logo.jpg'; // Aquí la URL o ruta de la imagen
            const userMessage = `◪ *Name:* ${tag}\n├◆ *Role:* ${role}\n├◆ *Exp:* ${exp} xp\n╰◆ *Level:* ${beforeLevel} ➠ ${newLevel}\n`.trim();
            await m.reply(userMessage);

            // Recompensas por nivel
            const rewards = calculateRewards(newLevel);
            applyRewards(user, rewards);

            const rewardMessage = formatRewardsMessage(newLevel, rewards);
            await m.reply(rewardMessage);
        }
    } catch (error) {
        console.error("Error en el manejo de nivel:", error);
    }
};

export default handler;

// Función para asignar roles según el nivel
function assignRole(level) {
    const roles = {
        0: '🌱 Aventurero(a) Novato(a) V',
        10: '🌿 Explorador(a) IV',
        20: '🍃 Guardián(a) III',
        30: '🌳 Héroe(a) II',
        40: '🌲 Leyenda I',
    };
    return roles[Math.floor(level / 10) * 10] || '🌟 Maestro(a)';
}

// Función para calcular recompensas
function calculateRewards(level) {
    const baseRewards = { cookies: 5, exp: 10, money: 50, joincount: 1 };
    const multiplier = Math.floor(level / 10) || 1;

    return {
        cookies: baseRewards.cookies * multiplier,
        exp: baseRewards.exp * multiplier,
        money: baseRewards.money * multiplier,
        joincount: baseRewards.joincount * multiplier,
    };
}

// Función para aplicar recompensas al usuario
function applyRewards(user, rewards) {
    for (const [key, value] of Object.entries(rewards)) {
        user[key] = (user[key] || 0) + value;
    }
}

// Función para formatear el mensaje de recompensas
function formatRewardsMessage(level, rewards) {
    return `🎁 ¡Recompensas por alcanzar el nivel ${level}!\n` +
        `🍪 Cookies: ${rewards.cookies}\n` +
        `✨ Exp: ${rewards.exp}\n` +
        `💰 Dinero: ${rewards.money}\n` +
        `🔗 Tickets: ${rewards.joincount}`;
}






/* import { xpRange, canLevelUp, findLevel } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
        let user = global.db.data.users[m.sender]
        if (!user.autolevelup)
                return !0
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
        let pp = './src/avatar_contact.png'
        let who = m.sender
        let exp = global.db.data.users[m.sender].exp
        let logo = await (await fetch(thumblvlup.getRandom())).buffer()
        let wm = global.author
        let discriminator = who.substring(9, 13)
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let username = conn.getName(who)
        try {
                pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        } catch (e) {
        } finally {
                if (!user.autolevelup) return !0
                let before = user.level * 1
                while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
                if (before !== user.level) {
                        user.role = global.db.data.users[m.sender].role
                        {
                                let tag = `@${m.sender.replace(/@.+/, '')}`
                                conn.sendFile(m.chat, logo, 'Thumb.jpg', `◪ *Name:* ${tag}\n├◆ *Role:* ${user.role}\n├◆ *Exp:* ${exp} xp\n╰◆ *Level:* ${before} ➠ ${user.level}\n`.trim(), m)
                        }
                }
        }
}
export default handler

function sort(property, ascending = true) {
        if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
        else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
        if (property) return (a, i, b) => {
                return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
        }
        else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
        return a.jid
}


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
ᰔᩚ *${especimport { xpRange, canLevelUp, findLevel } from '../lib/levelling.js';
import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m) {
    let user = global.db?.data?.users?.[m.sender];
    if (!user?.autolevelup) return true;

    const { exp, level } = user;
    const { multiplier } = global;
    const { min, xp, max } = xpRange(level, multiplier);

    try {
        let beforeLevel = level;
        while (canLevelUp(level, exp, multiplier)) user.level++;

        if (beforeLevel !== user.level) {
            const newLevel = user.level;
            const role = assignRole(newLevel); // Función para asignar roles según nivel
            user.role = role;

            // Mensaje de notificación
            const message = `🎉 ¡Subiste de nivel!\n👤 Usuario: ${m.sender}\n🌟 Nivel: ${beforeLevel} ➡️ ${newLevel}\n🏅 Nuevo rol: ${role}`;
            await m.reply(message);

            // Recompensas por nivel
            const rewards = calculateRewards(newLevel);
            applyRewards(user, rewards);

            const rewardMessage = formatRewardsMessage(newLevel, rewards);
            await m.reply(rewardMessage);
        }
    } catch (error) {
        console.error("Error en el manejo de nivel:", error);
    }
};

export default handler;

// Función para asignar roles según el nivel
function assignRole(level) {
    const roles = {
        0: '🌱 Aventurero(a) Novato(a) V',
        10: '🌿 Explorador(a) IV',
        20: '🍃 Guardián(a) III',
        30: '🌳 Héroe(a) II',
        40: '🌲 Leyenda I',
    };
    return roles[Math.floor(level / 10) * 10] || '🌟 Maestro(a)';
}

// Función para calcular recompensas
function calculateRewards(level) {
    const baseRewards = { cookies: 5, exp: 10, money: 50, joincount: 1 };
    const multiplier = Math.floor(level / 10) || 1;

    return {
        cookies: baseRewards.cookies * multiplier,
        exp: baseRewards.exp * multiplier,
        money: baseRewards.money * multiplier,
        joincount: baseRewards.joincount * multiplier,
    };
}

// Función para aplicar recompensas al usuario
function applyRewards(user, rewards) {
    for (const [key, value] of Object.entries(rewards)) {
        user[key] = (user[key] || 0) + value;
    }
}

// Función para formatear el mensaje de recompensas
function formatRewardsMessage(level, rewards) {
    return `🎁 ¡Recompensas por alcanzar el nivel ${level}!\n` +
        `🍪 Cookies: ${rewards.cookies}\n` +
        `✨ Exp: ${rewards.exp}\n` +
        `💰 Dinero: ${rewards.money}\n` +
        `🔗 Tickets: ${rewards.joincount}`;
}ialCant3 * 5} ${especial3}*
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