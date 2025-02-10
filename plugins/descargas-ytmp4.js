let handler = async (m, { conn, text }) => {
    await m.react('🕓');
    
    if (!text) return conn.reply(m.chat, "❌ *Por favor, ingresa un enlace de YouTube.*", m);

    try {
        let url = `https://ytcdn.project-rian.my.id/download?url=${encodeURIComponent(text)}&resolution=360`;
    
        await conn.sendMessage(m.chat, { 
            video: { url }, 
            caption: "🎥 *Aquí está tu video*" 
        }, { quoted: m });

        await m.react('✅');
    } catch {
        await m.react('❌');
        conn.reply(m.chat, "*Hubo un error en la api*", m);
    }
};

handler.help = ["ytmp4"];
handler.tags = ["dl"];
handler.command = ["ytmp4"];
export default handler;
