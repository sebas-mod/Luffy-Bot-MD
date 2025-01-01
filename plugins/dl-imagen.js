import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, '🚩 Ingresa el texto de lo que quieres buscar', m, rcanal);
await m.react(rwait)
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', dev, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 3', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `🚩 Resultado de ${text}`, '🔎 Imagen - Descargas', null, messages, m);
};
handler.help = ['imagen *<texto>*'];
handler.tags = ['search', 'dl'];
handler.command = ['image','imagen'];
handler.register = true
export default handler;
