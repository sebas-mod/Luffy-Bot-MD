/* 
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// [ 🍧 4VS4 FREE FIRE ]
const partidas = {};

const handler = async (m, { conn, args, command }) => {

  const sendPartidaMessage = (chatId, partidaId, partida, quotedMsg) => {
    const mensaje = generarMensaje(partida);
    conn.sendMessage(
      chatId,
      {
        text: mensaje,
        footer: "¡Anótate para el 4vs4!",
        buttons: [
          {
            buttonId: `.anotar ${partidaId}`,
            buttonText: { displayText: "📌 Anotar" },
          },
        ],
        viewOnce: true,
        headerType: 1,
      },
      { quoted: quotedMsg }
    );
  };

  if (command === "anotar") {
    const who = m.sender;
    const { name } = global.db.data.users[who];
    const partidaId = args[0];

    if (!partidas[partidaId]) {
      conn.reply(m.chat, "No hay una partida activa en este momento.", m);
      return;
    }

    if (
      partidas[partidaId].jugadores.includes(name) ||
      partidas[partidaId].suplentes.includes(name)
    ) {
      conn.reply(m.chat, "¡Ya estás anotado en esta partida!", m);
      sendPartidaMessage(m.chat, partidaId, partidas[partidaId], m);
      return;
    }

    if (partidas[partidaId].jugadores.length < 4) {
      partidas[partidaId].jugadores.push(name);
    } else if (partidas[partidaId].suplentes.length < 2) {
      partidas[partidaId].suplentes.push(name);
    } else {
      conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos! Lista cerrada.", m);
      conn.sendMessage(m.chat, "Lista llena, suerte en el VS!", m);
      return;
    }

    if (partidas[partidaId].jugadores.length === 4 && partidas[partidaId].suplentes.length === 2) {
      conn.reply(m.chat, "¡Lista llena, suerte en el VS!", m);
    }

    sendPartidaMessage(m.chat, partidaId, partidas[partidaId], m);
    return;
  }

  // Crear partida
  if (args.length < 4) {
    conn.reply(
      m.chat,
      `Debes proporcionar esto.
*.4vs4 <región> <hora> <Bandera> <modalidad>*

*Regiones*
SR (Sudamérica)
EU (Estados Unidos)

*Ejemplo:*
.4vs4 SR 22:00 🇦🇷 infinito
.4vs4 SR 22:00 🇦🇷 vivido
.4vs4 EU 20:00 🇲🇽 infinito
.4vs4 EU 20:00 🇲🇽 vivido`,
      m
    );
    return;
  }

  const modalidad = args[3].toLowerCase();
  if (modalidad !== "infinito" && modalidad !== "vivido") {
    conn.reply(m.chat, 'Modalidad no válida. Escribe "infinito" o "vivido".', m);
    return;
  }

  const region = args[0].toUpperCase();
  if (region !== "SR" && region !== "EU") {
    conn.reply(m.chat, 'La región no es válida. Usa SR o EU.', m);
    return;
  }

  const partidaId = `${m.chat}-${args[0]}-${args[1]}`;

  const horariosSR = { BO: "21:00", PE: "20:00", AR: "22:00" };
  let horariosEU = { CO: "21:00", MX: args[1] };
  const horarios = region === "SR" ? horariosSR : horariosEU;

  if (!partidas[partidaId]) {
    partidas[partidaId] = {
      jugadores: [],
      suplentes: [],
      hora: args[1],
      modalidad: modalidad.toUpperCase(),
      reglas: modalidad === "infinito" ? ".reglasinf" : ".reglasvv2",
      horarios: horarios,
    };
  } else {
    partidas[partidaId].modalidad = modalidad.toUpperCase();
    partidas[partidaId].reglas = modalidad === "infinito" ? ".reglasinf" : ".reglasvv2";
  }

  sendPartidaMessage(m.chat, partidaId, partidas[partidaId], m);
};

// 🧠 Generador de mensaje de partida
function generarMensaje(partida) {
  const horarios = Object.entries(partida.horarios)
    .map(([pais, hora]) => {
      const bandera = { BO: "🇧🇴", PE: "🇵🇪", AR: "🇦🇷", CO: "🇨🇴", MX: "🇲🇽" }[pais];
      return `*${bandera} ${pais} :* ${hora}`;
    })
    .join("\n");

  const escuadra = [
    `🥷 ${partida.jugadores[0] || ""}`,
    `🥷 ${partida.jugadores[1] || ""}`,
    `🥷 ${partida.jugadores[2] || ""}`,
    `🥷 ${partida.jugadores[3] || ""}`,
  ].join("\n");

  const suplentes = [
    `🥷 ${partida.suplentes[0] || ""}`,
    `🥷 ${partida.suplentes[1] || ""}`,
  ].join("\n");

  return (
    `*4 VERSUS 4 ${partida.modalidad}*\n` +
    `${horarios}\n` +
    `*REGLAS:* ${partida.reglas}\n` +
    `𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔\n${escuadra}\n𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦\n${suplentes}`.trim()
  );
}

handler.help = ["4vs4 <Reg|Hr|Bnd|Mod>"];
handler.tags = ["main"];
handler.command = /^(4vs4|anotar)$/i;
handler.group = true;

export default handler;
