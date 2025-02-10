/* 
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

const partidas = {};

const handler = async (m, { conn, args, command }) => {
  if (command === 'anotar') {
    const who = m.sender;
    const { name } = global.db.data.users[who];
    const partidaId = args[0];

    if (!partidas[partidaId]) {
      conn.reply(m.chat, "𝐧𝐨 𝐡𝐚𝐲 𝐮𝐧𝐚 𝐩𝐚𝐫𝐭𝐢𝐝𝐚 𝐚𝐜𝐭𝐢𝐯𝐚 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐦𝐨𝐦𝐞𝐧𝐭𝐨.", m);
      return;
    }

    if (partidas[partidaId].jugadores.includes(name) || partidas[partidaId].suplentes.includes(name)) {
      conn.reply(m.chat, "¡𝐲𝐚 𝐞𝐬𝐭𝐚𝐬 𝐚𝐧𝐨𝐭𝐚𝐝𝐨 𝐞𝐧 𝐞𝐬𝐭𝐚 𝐩𝐚𝐫𝐭𝐢𝐝𝐚!", m);
      return;
    }

    if (partidas[partidaId].jugadores.length < 4) {
      partidas[partidaId].jugadores.push(name);
    } else if (partidas[partidaId].suplentes.length < 2) {
      partidas[partidaId].suplentes.push(name);
    } else {
      conn.reply(m.chat, "¡𝐋𝐚 𝐞𝐬𝐜𝐮𝐚𝐝𝐫𝐚 𝐲 𝐬𝐮𝐩𝐥𝐞𝐧𝐭𝐞𝐬 𝐲𝐚 𝐞𝐬𝐭á𝐧 𝐥𝐥𝐞𝐧𝐨𝐬! 𝐋𝐢𝐬𝐭𝐚 𝐜𝐞𝐫𝐫𝐚𝐝𝐚.", m);
      return;
    }

    const mensaje = generarMensaje(partidas[partidaId]);
    conn.sendMessage(m.chat, {
      text: mensaje,
      footer: "¡Anótate para el 4vs4!",
      buttons: [{ buttonId: `.anotar ${partidaId}`, buttonText: { displayText: "📌 Anotar" } }],
      viewOnce: true,
      headerType: 1
    }, { quoted: m });
    return;
  }

  if (args.length < 4) {
    conn.reply(m.chat, 'Debes proporcionar esto.\n*.4vs4 <región> <hora> <Bandera> <modalidad>*\n\n*Regiones\nSR (Sudamérica)\nEU (Estados Unidos)\n\n*Ejemplo:*\n.4vs4 SR 22:00 🇦🇷 infinito\n.4vs4 SR 22:00 🇦🇷 vivido\n.4vs4 EU 20:00 🇲🇽 infinito\n.4vs4 EU 20:00 🇲🇽 vivido', m);
    return;
  }

  const modalidad = args[3].toLowerCase();
  if (!['infinito', 'vivido'].includes(modalidad)) {
    conn.reply(m.chat, 'Modalidad no válida. Escribe "infinito" o "vivido".', m);
    return;
  }

  const region = args[0].toUpperCase();
  if (!['SR', 'EU'].includes(region)) {
    conn.reply(m.chat, 'La región no es válida. Usa SR o EU.', m);
    return;
  }

  const partidaId = `${m.chat}-${args[0]}-${args[1]}`;
  const horariosSR = { BO: "21:00", PE: "20:00", AR: "22:00" };
  let horariosEU = { CO: "21:00", MX: args[1] };
  const horarios = region === 'SR' ? horariosSR : horariosEU;

  if (!partidas[partidaId]) {
    partidas[partidaId] = {
      jugadores: [],
      suplentes: [],
      hora: args[1],
      modalidad: modalidad.toUpperCase(),
      reglas: modalidad === 'infinito' ? '.reglasinf' : '.reglasvv2',
      horarios: horarios
    };
  } else {
    partidas[partidaId].modalidad = modalidad.toUpperCase();
    partidas[partidaId].reglas = modalidad === 'infinito' ? '.reglasinf' : '.reglasvv2';
  }

  const mensaje = generarMensaje(partidas[partidaId]);
  conn.sendMessage(m.chat, {
    text: mensaje,
    footer: "¡Anótate para el 4vs4!",
    buttons: [{ buttonId: `.anotar ${partidaId}`, buttonText: { displayText: "📌 Anotar" } }],
    viewOnce: true,
    headerType: 1
  }, { quoted: m });
};

function generarMensaje(partida) {
  const horarios = Object.entries(partida.horarios)
    .map(([pais, hora]) => {
      const bandera = { BO: "🇧🇴", PE: "🇵🇪", AR: "🇦🇷", CO: "🇨🇴", MX: "🇲🇽" }[pais];
      return `*${bandera} ${pais} :* ${hora}`;
    })
    .join("\n");

  const escuadra = Array(4).fill('-').map((_, i) => partida.jugadores[i] ? `🥷 ${partida.jugadores[i]}` : '-').join("\n");
  const suplentes = Array(2).fill('-').map((_, i) => partida.suplentes[i] ? `🥷 ${partida.suplentes[i]}` : '-').join("\n");

  return `*4 VERSUS 4 ${partida.modalidad}*\n${horarios}\n*REGLAS:* ${partida.reglas}\n𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔\n${escuadra}\n𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦\n${suplentes}`;
}

handler.help = ['4vs4 <Reg|Hr|Bnd|Mod>'];
handler.tags = ['main'];
handler.command = /^(4vs4|anotar)$/i;
handler.group = true;

export default handler;
