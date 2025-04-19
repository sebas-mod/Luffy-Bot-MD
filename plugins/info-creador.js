import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    await m.react('🎉');

    // Mensaje falso de contacto para citar
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let username = await conn.getName(m.sender);

    // vCard del creador
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:Dzn;Sebas
FN:Sebas Dzn
NICKNAME:Sebas-dzn
ORG:sebas-MD
TITLE:Soft
item1.TEL;waid=5491166887146:+5491166887146
item1.X-ABLabel:WhatsApp Owner
item2.URL:https://github.com/sebas-MD
item2.X-ABLabel:More
item3.EMAIL;type=INTERNET:siloleeseresputo@gmail.com
item3.X-ABLabel:Correo soporte
item4.ADR:;;Argentina;;;;
item4.X-ABLabel:Localización
BDAY:2004-07-02
END:VCARD`;

    // Enviar contacto
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: "Creador",
            contacts: [{ vcard }] 
        }
    }, { quoted: fkontak });

    // Enviar mensaje adicional con botón
    let txt = `👋 *Hola \`${username}\`, este es el contacto de mi creador*`;

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '© ᥴrᥱᥲძ᥆r ᥆𝖿іᥴіᥲᥣ sebas.MD',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: 'MENU BOT'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
