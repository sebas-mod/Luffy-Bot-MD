import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m, null, fake);
    await m.react('🕑');

    try {
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`);
        let json = await api.json();
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response;

        let txt = '';
        txt += `*${filename}*\n\n`;
        txt += `- *Tipo :* ${type}\n`;
        txt += `- *Tamaño :* ${size}\n`; 
        txt += `- *Creado :* ${uploaded}\n`;

        // Enviar la información del archivo
        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
        
        await m.react('✅');
        
        // Enviar el archivo
        await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true });

    } catch (error) {
        console.error(error);
    }
};

handler.help = ['mediafire *<url>*'];
handler.tags = ['dl'];
handler.command = ['mediafire'];

export default handler;


/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m, null, fake)
        await m.react('🕑');

    try {
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`)
        let json = await api.json()
        let { filename, type, size, uploaded, ext, mimetype, download: dl_url } = json.data.response
let txt = '';
txt += `*${filename}*\n\n`;
txt += `- *Tipo :* ${type}\n`;
txt += `- *Tamaño :* ${size}\n`; 
txt += `- *Creado :* ${uploaded}\n`;
/*       m.reply(`*${filename}*

- *Tipo :* ${type}
- *Tamaño :* ${size}
- *Creado :* ${uploaded}`) */
        await conn.sendMessage(m.chat, txt, m, null, fake);
        await m.react('✅');
        await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true })
    } catch (error) {
        console.error(error)
    }
}

handler.help = ['mediafire *<url>*']
handler.tags = ['dl']
handler.command = ['mediafire']

export default handler; */