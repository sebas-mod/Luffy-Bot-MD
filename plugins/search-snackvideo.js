import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `[ ✰ ] Ingresa una palabra clave para buscar en SnackVideo.\nEjemplo: *snackvideo gatos*`, m);
    }

    await m.react('🕓');
    try {
        const query = encodeURIComponent(args.join(' '));
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/snackvideo?q=${query}`);
        const data = response.data;

        if (data.status && data.result) {
            const { title, like, comments, share, URL } = data.result;

            const message = `🏷️ *Título*: ${title}\n` +
                            `❤️ *Likes*: ${like}\n` +
                            `💬 *Comentarios*: ${comments}\n` +
                            `🔄 *Compartidos*: ${share}\n` +
                            `🔗 *Enlace*: ${URL}\n`;

            await conn.reply(m.chat, message, m);
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ] No se encontraron resultados para *${args.join(' ')}*`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ] Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['snackvideosearch *<texto>*'];
handler.tags = ['search'];
handler.command = ['snackvideosearch'];

export default handler;
