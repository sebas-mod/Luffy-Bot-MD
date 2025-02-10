import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🍟 Ingresa un link de APK desde APKFab.`, m);
    await m.react('🕓');

    try {
        let api = await fetch(`https://bk9.fun/download/apkfab?url=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (!json.status) return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { title, link, size } = json.BK9;
        let caption = `*「✐」${title}*\n\n> ❒ Tamaño » *${size || 'Desconocido'}*\n> 🔗 [Descargar APK](${link})`;

        // Enviar el archivo APK con el caption
        await conn.sendFile(m.chat, link, title, caption, m, null, { mimetype: 'application/vnd.android.package-archive', asDocument: true });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
}

handler.help = ['apkfab *<url>*'];
handler.tags = ['dl'];
handler.command = ['apkfab'];

export default handler;
