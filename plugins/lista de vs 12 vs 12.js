/* 
- Código Creado Por Izumi-kzx
- Adaptado por Code para 12 vs 12 Mapa Grande
- Power By Team Code Titans
*/

const partidas = {};

const handler = async (m, { conn, args, command }) => {

  const sendPartidaMessage = (chatId, partidaId, partida, quotedMsg) => {
    const mensaje = generarMensaje(partida);
    conn.sendMessage(
      chatId,
      {
        text: mensaje,
        footer: "¡Anótate para el 12vs12!",
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

    if (partidas[partidaId].jugadores.length < 12) {
      partidas[partidaId].jugadores.push(name);
    } else if (partidas[partidaId].suplentes.length < 4) {
      partidas[partidaId].suplentes.push(name);
    } else {
      conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos! Lista cerrada.", m);
      conn.sendMessage(m.chat, "Lista llena, suerte en el VS!", m);
      return;
    }

    if (partidas[partidaId].jugadores.length === 12 && partidas[partidaId].suplentes.length === 4) {
      conn.reply(m.chat, "¡Lista completa! ¡Listos para el mapa grande!", m);
    }

    sendPartidaMessage(m.chat, partidaId, partidas[partidaId], m);
    return;
  }

  // Crear partida
  if (args.length < 3) {
    conn.reply(
      m.chat,
      `Debes proporcionar esto.
*.12vs12 <región> <hora> <bandera>*

*Regiones*
SR (Sudamérica)
EU (Estados Unidos)

*Ejemplo:*
.12vs12 SR 21:00 🇦🇷`,
      m
    );
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
      modalidad: "12 VS 12",
      reglas: "MAPA GRANDE - 12 VS 12",
      horarios: horarios,
    };
  }

  sendPartidaMessage(m.chat, partidaId, partidas[partidaId], m);
};

// 🧠 Generador de mensaje para 12vs12
function generarMensaje(partida) {
  const horarios = Object.entries(partida.horarios)
    .map(([pais, hora]) => {
      const bandera = { BO: "🇧🇴", PE: "🇵🇪", AR: "🇦🇷", CO: "🇨🇴", MX: "🇲🇽" }[pais];
      return `*${bandera} ${pais} :* ${hora}`;
    })
    .join("\n");

  const escuadra = Array.from({ length: 12 }, (_, i) => `🥷 ${partida.jugadores[i] || ""}`).join("\n");
  const suplentes = Array.from({ length: 4 }, (_, i) => `🥷 ${partida.suplentes[i] || ""}`).join("\n");

  return (
    `*12 VERSUS 12 - MAPA GRANDE*\n` +
    `${horarios}\n` +
    `*REGLAS:* ${partida.reglas}\n` +
    `𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔\n${escuadra}\n𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦\n${suplentes}`.trim()
  );
}

handler.help = ["12vs12 <Región|Hora|Bandera>"];
handler.tags = ["main"];
handler.command = /^(12vs12|anotar)$/i;
handler.group = true;

export default handler;
