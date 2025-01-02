/* 
- Nglspam By Angel-OFC  
- Spam de mensajes en NGL
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import crypto from 'crypto';
import fetch from 'node-fetch';

const sendMessage = async (username, message, spamCount) => {
    let counter = 0;
    while (counter < spamCount) {
        try {
            const date = new Date();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            const formattedDate = `${hours}:${minutes}`;
            const deviceId = crypto.randomBytes(21).toString('hex');
            const url = 'https://ngl.link/api/submit';
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Referer': `https://ngl.link/${username}`,
                'Origin': 'https://ngl.link'
            };
            const body = `username=${username}&question=${message}&deviceId=${deviceId}&gameSlug=&referrer=`;

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                mode: 'cors',
                credentials: 'include'
            });

            if (response.status !== 200) {
                console.log(`[${formattedDate}] [Error] Limitado por el servidor`);
                await new Promise(resolve => setTimeout(resolve, 25000));
            } else {
                counter++;
                console.log(`[${formattedDate}] [Mensaje] Enviado: ${counter}`);
            }
        } catch (error) {
            console.error(`[${formattedDate}] [Error] ${error}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

const handler = async (m, { text }) => {
    if (!text.split("|")[0] || !text.split("|")[1] || !text.split("|")[2]) {
        return m.reply(
            "Ingresa el nombre de usuario, mensaje y la cantidad de spam.\nEjemplo: .nglspam izumi.kzx|hola|5"
        );
    }

    const [username, message, count] = text.split("|");
    const spamCount = parseInt(count, 10);

    if (isNaN(spamCount) || spamCount <= 0) {
        return m.reply("¡La cantidad de spam debe ser un número positivo!");
    }

    try {
        await m.react('✅');
        await sendMessage(username, message, spamCount);
        m.reply(`Éxito al enviar ${spamCount} mensajes NGL a ${username}`);
    } catch (e) {
        console.error(e);
        return m.reply("Error en la función, inténtalo de nuevo más tarde.");
    }
};

handler.help = ["nglspam *<nom|msj|cant>*"]
handler.tags = ["anonymous"]
handler.command = ["nglspam"]
handler.premium = true;

export default handler;