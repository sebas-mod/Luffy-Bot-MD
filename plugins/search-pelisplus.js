/* 
- Search PelisPlus By Jose XrL
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/
// *🍁 《 PelisPlus  - Search 》*

import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `🚩 Ingrese un título de película para buscar\n\nEjemplo:\n> *${usedPrefix + command}* diablo`, m, rcanal);

    await m.react('🕓');
    try {
        const response = await axios.get(`https://api.dorratz.com/v2/pelis-search?q=${encodeURIComponent(args.join(' '))}`);
        
        if (!response.data.status) {
            return conn.reply(m.chat, 'No se encontraron resultados para su búsqueda.', m);
        }
        
        let peliculas = response.data.peliculas;
        let txt = '`乂  P E L I C U L A S  -  B U S Q U E D A`\n\n';

        peliculas.forEach(pelicula => {
            txt += `🍟 *Título* : ${pelicula.titulo}\n`;
            txt += `🍟 *Rating* : ${pelicula.rating}\n`;
            txt += `🍟 *Enlace* : ${pelicula.link}\n`;
            txt += `🍟 *Imagen* : ${pelicula.imagen}\n\n---------------------------------------------------\n\n`;
        });

        await conn.reply(m.chat, txt.trim(), m);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        return conn.reply(m.chat, 'Hubo un error al buscar las películas. Intente nuevamente más tarde.', m);
    }
};

handler.help = ['pelisplus *<texto>*'];
handler.tags = ['search'];
handler.command = ['pelisplussearch', 'pelisplus'];
handler.register = true;

export default handler;
