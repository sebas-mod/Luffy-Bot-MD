// Código Creado Por darkcore Wa.me/51968382008
import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {

if (!text) return conn.reply(m.chat, `* Ingresa un texto para generar tu imagen a tu gusto*`, m, fake);
await m.react('🕒');
try {

const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);

if (!response.ok) throw new Error('Network response was not ok');

const buffer = await response.buffer();

m.react('✅');

await conn.sendFile(m.chat, buffer, 'imagen.jpg', listo, m, fake);
} catch (error) {
console.error(error);
throw `*🚨 Lo sentimos, ha ocurrido un error 😔*`;
}
}

handler.tags = ['ai'];
handler.help = ['genearimg *<texto>*'];
handler.command = ['genearimg', 'imgg'];
handler.register = true;

export default handler;
