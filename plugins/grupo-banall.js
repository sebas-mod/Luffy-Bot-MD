let handler = async (m, { conn, command }) => {
    global.db = global.db || { data: { chats: {} } };
    global.db.data.chats = global.db.data.chats || {};

    if (command === 'unbanall') {
        let count = 0;

        for (let chatId in global.db.data.chats) {
            if (global.db.data.chats[chatId].isBanned) {
                global.db.data.chats[chatId].isBanned = false;
                count++;
                await conn.reply(chatId, 🚩 El bot ha sido activado en este chat., m);
            }
        }

        if (count > 0) {
            await conn.reply(m.chat, ✅ Desbaneado en ${count} grupo(s)., m);
        } else {
            await conn.reply(m.chat, ⚠ No hay grupos baneados., m);
        }
    }
};

handler.help = ['unbanall'];
handler.tags = ['owner'];
handler.command = ['unbanall'];
handler.owner = true; 

export default handler;
