/* 
- Search Apkdroid By Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🍟 APKDROID SEARCH ]*
import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Ingresa el nombre de la APK que quieres buscar');
    await m.react('🕓');

    try {
        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
            return imageMessage;
        }

        let push = [];
        let api = await fetch(`https://dark-core-api.vercel.app/api/search/APKDetails?key=user1&query=${encodeURIComponent(text)}`);
        let json = await api.json();

        if (!json.success || !json.data.length) return m.reply('No se encontraron resultados.');

        for (let apk of json.data) {
            let image = await createImage(apk.imageUrl);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `• *Nombre:* ${apk.title} \n• *Versión:* ${apk.version} \n• *Desarrollador:* ${apk.developer}\n• *enlace:* ${apk.link}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_copy",
                            "buttonParamsJson": `{\"display_text\":\"📥 Descargar APK\",\"id\":\"123456789\",\"copy_code\":\".apkdroid ${apk.link}\"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados de:* ${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '_\`APK Search\`_\ncopia o apreta el Botón abajo del APK y pégalo en la barra de escribir para descargar' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
                    })
                }
            }
        }, { 'quoted': m });

        await m.react('🍟');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al buscar la APK.');
    }
};

handler.help = ["apkdroidsearch *<texto>*"];
handler.tags = ["search"];
handler.command = ["apkdroidsearch"]

export default handler;
