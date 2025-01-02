import crypto from 'crypto';
import fetch from 'node-fetch';

// wm creado por RexxHayanasi
// wm oficial: https://whatsapp.com/channel/0029VaHMgM3Lo4hcfGTJ3W1e

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

// Función para manejar el comando
const handler = async (m, { text }) => {
    if (!text.split("|")[0] || !text.split("|")[1] || !text.split("|")[2]) {
        return m.reply(
            "Ingresa el nombre de usuario, mensaje y la cantidad de spam.\nEjemplo: .nglspam rexxzynxd|hola|5"
        );
    }

    const [username, message, count] = text.split("|");
    const spamCount = parseInt(count, 10);

    if (isNaN(spamCount) || spamCount <= 0) {
        return m.reply("¡La cantidad de spam debe ser un número positivo!");
    }

    try {
        await sendMessage(username, message, spamCount);
        m.reply(`Éxito al enviar ${spamCount} mensajes NGL a ${username}`);
    } catch (e) {
        console.error(e); // Agregado para depuración
        return m.reply("Error en la función, inténtalo de nuevo más tarde.");
    }
};

handler.command = handler.help = ["nglspam"];
handler.tags = ["tools"];

handler.help = ["nglspam *<nombre | mensaje | cantidad>*"]
handler.tags = ["tools"]
handler.command = ["nglspam"]

handler.premium = true;
export default handler;