/*
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// [ 🍧 4VS4 FREE FIRE ]
const partidas = {};

const handler = async (m, { conn, args, command }) => {
  if (command === 'anotar') {
    const quien = m.sender;
    const { name } = global.db.data.users[quien];
    const partidaId = args[0];
    
    if (!partidas[partidaId]) {
      conn.reply(m.chat, "No hay una partida activa en este momento.", m);
      return;
    }

    // Verifica si ya está anotado el usuario
    if (partidas[partidaId].jugadores.includes(name) || partidas[partidaId].suplentes.includes(name)) {
      conn.reply(m.chat, "¡Ya estás anotado en esta partida!", m);
      const mensaje = generarMensaje(partidas[partidaId]);
      conn.sendMessage(m.chat, { 
        text: mensaje, 
        footer: "¡Anótate para el 4vs4!", 
        buttons: [{ 
          buttonId: `anotar ${partidaId}`, 
          buttonText: { displayText: "📌 Anotar" } 
        }], 
        viewOnce: true, 
        headerType: 1 
      }, { quoted: m });
      return;
    }

    // Agregar jugador a la partida automáticamente al presionar el botón
    if (partidas[partidaId].jugadores.length < 4) {
      partidas[partidaId].jugadores.push(name);
    } else if (partidas[partidaId].suplentes.length < 2) {
      partidas[partidaId].suplentes.push(name);
    } else {
      conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos! Lista cerrada.", m);
      conn.sendMessage(m.chat, "Lista llena, suerte en el VS!", m);
      return;
    }

    // Cuando se llena la lista
    if (partidas[partidaId].jugadores.length === 4 && partidas[partidaId].suplentes.length === 2) {
      conn.reply(m.chat, "¡Lista llena, suerte en el VS!", m);
    }

    // Enviar mensaje actualizado
    const mensaje = generarMensaje(partidas[partidaId]);
    conn.sendMessage(m.chat, { 
      text: mensaje, 
      footer: "¡Anótate para el 4vs4!", 
      buttons: [{ 
        buttonId: `anotar ${partidaId}`, 
        buttonText: { displayText: "📌 Anotar" } 
      }], 
      viewOnce: true, 
      headerType: 1 
    }, { quoted: m });
    return;
  }

  // Comprobando si los argumentos son suficientes
  if (args.length < 4) {
    conn.reply(m.chat, 'Debes proporcionar esto.\n*.4vs4 <región> <hora> <Bandera> <modalidad>\n\n*Regiones*\nSR (Sudamérica)\nEU (Estados Unidos)\n\n*Ejemplo:*\n.4vs4 SR 22:00 🇦🇷 infinito\n.4vs4 SR 22:00 🇦🇷 vivido\n.4vs4 EU 20:00 🇲🇽 infinito\n.4vs4 EU 20:00 🇲🇽 vivido', m);
    return;
  }

  const modalidad = args[3].toLowerCase();
  if (modalidad !== 'infin
