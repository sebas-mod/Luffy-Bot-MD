import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
   ['5491166887146', 'Creador 👑', true],

]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//cambiar a true si el bot detecta sus propios comandos.
global.isBaileysFail = false
global.libreria = 'Baileys'
global.baileys = 'V 6.7.5'
global.vs = '2.0.7'
global.vsJB = '5.0'
global.nameqr = 'luffy bot md'
global.namebot = 'luffy bot md'
global.sessions = 'luffySession'
global.jadi = 'luffyJadiBot'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃'
global.botname = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃'
global.wm = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃'
global.author = '𝑴𝒂𝒅𝒆 𝑩𝒚 : 𝑺𝒆𝒃𝒂𝒔-𝑴𝑫☕'
global.dev = '© 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚: 𝑺𝒆𝒃𝒂𝒔-𝑴𝑫'
global.textbot = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃 : 𝑺𝒆𝒃𝒂𝒔-𝑴𝑫'
global.namebot = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃'
global.stickpack = `© 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚: 𝑺𝒆𝒃𝒂𝒔-𝑴𝑫`
global.titulowm = '𝑺𝒆𝒃𝒂𝒔-𝑴𝑫'
global.titulowm2 = 'sere el rey de los piratas'
global.igfg = '@sebas-dzn'
global.titu = '©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ'
global.listo = '*Aqui tiene ฅ^•ﻌ•^ฅ*'
global.vs = '2.0.7'
global.namechannel = '𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃'
global.stickauth = `© 𝐋𝐮𝐟𝐟𝐲 𝐁𝐨𝐭 𝐌𝐃 : 𝑺𝒆𝒃𝒂𝒔-𝑴𝑫`
global.dis = '♕⫸'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.png')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = 'https://chat.whatsapp.com/DJkL87Jl3qFCRCUNt19UlO'
global.group2 = 'https://chat.whatsapp.com/DJkL87Jl3qFCRCUNt19UlO'
global.canal = 'https://whatsapp.com/channel/0029VafHsEoBqbr3qlW1aX0U'
global.github = 'https://github.com/sebas-mod' 
global.instagram = 'https://www.instagram.com/sebas_dzn' 
global.whatsApp = 'https://wa.me/5491166887146'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '𝑳𝒖𝒇𝒇𝒚 ᥕһᥲ𝗍sᥲ⍴⍴ ᑲ᥆𝗍♕', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}};

global.fakegif2 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'Luffy BOt - MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𖥔.𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨❞ ꔷ──᜔◇⃟̣̣⃕✨', jpegThumbnail: catalogo }}};

global.fakegif3 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'Luffy Bot', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '𝑳𝒖𝒇𝒇𝒚 𝑩𝒐𝒕♕', jpegThumbnail: catalogo }}};

global.fakegif4 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'Luffy Bot-MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𝐒𝐭𝐢𝐜𝐤𝐞𝐫 (^_^♪) 🤍', jpegThumbnail: catalogo }}};

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.ch = {
ch1: '120363299030870235@newsletter',
ch2: '120363299030870235@newsletter',
ch3: '120363299030870235@newsletter'
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69
global.maxwarn = '3'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
