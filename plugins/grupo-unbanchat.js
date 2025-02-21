let handler = async (m, { conn, isAdmin, isROwner, command }) => {
    global.db = global.db || { data: { chats: {} } };
    global.db.data.chats = global.db.data.chats || {};
    global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};

    if (command === 'banchat') {
        global.db.data.chats[m.chat].isBanned = true;
        await conn.reply(m.chat, `🚩 El bot ha sido baneado en este chat.`, m);
        await m.react('✅');
    } else if (command === 'unbanchat') {
        global.db.data.chats[m.chat].isBanned = false;
        await conn.reply(m.chat, `🚩 El bot ha sido activado en este chat.`, m);
        await m.react('✅');
    }
};

handler.help = ['banchat', 'unbanchat'];
handler.tags = ['owner'];
handler.command = ['banchat', 'unbanchat'];
handler.group = true;
handler.owner = true;

export default handler;
