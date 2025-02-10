const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({ authStrategy: new LocalAuth() });
const opciones = ["piedra", "papel", "tijera"];
let juegosActivos = {};

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot listo para jugar Piedra, Papel o Tijera');
});

client.on('message', async msg => {
  const chatId = msg.from;
  const texto = msg.body.trim().toLowerCase();

  if (texto === "!help") {
    client.sendMessage(chatId, "*Piedra, Papel o Tijera*
Comandos disponibles:
- `!ppt` - Inicia un nuevo juego
- `!unirme` - Únete a una partida activa
- `!iniciar` - Comienza la partida cuando todos estén listos
- `piedra`, `papel`, `tijera` - Juega contra el bot o con otros participantes
- `!status` - Verifica si hay un juego activo en el chat");
  } else if (texto === "!ppt") {
    juegosActivos[chatId] = { jugadores: [], elecciones: {} };
    global.db.data.users[msg.author || chatId].wait = new Date * 1;
    client.sendMessage(chatId, "Juego iniciado. Envía *!unirme* para participar. Cuando estén listos, el creador del juego puede escribir *!iniciar*.");
  } else if (texto === "!unirme" && juegosActivos[chatId]) {
    if (!juegosActivos[chatId].jugadores.includes(msg.author || chatId)) {
      juegosActivos[chatId].jugadores.push(msg.author || chatId);
      client.sendMessage(chatId, `@${msg.author || chatId.split('@')[0]} se ha unido al juego.`, { mentions: [msg.author || chatId] });
    }
  } else if (texto === "!iniciar" && juegosActivos[chatId] && juegosActivos[chatId].jugadores.length > 1) {
    client.sendMessage(chatId, "El juego ha comenzado. Cada jugador debe enviar su elección: *piedra*, *papel* o *tijera*.");
  } else if (texto === "!status") {
    if (juegosActivos[chatId]) {
      client.sendMessage(chatId, "Hay un juego activo en este chat. Usa *!unirme* para participar o *!iniciar* para comenzar si ya hay jugadores.");
    } else {
      client.sendMessage(chatId, "No hay juegos activos en este chat. Usa *!ppt* para iniciar uno.");
    }
  } else if (opciones.includes(texto) && juegosActivos[chatId] && juegosActivos[chatId].jugadores.includes(msg.author || chatId)) {
    juegosActivos[chatId].elecciones[msg.author || chatId] = texto;
    client.sendMessage(chatId, `@${msg.author || chatId.split('@')[0]} ha elegido.`, { mentions: [msg.author || chatId] });
    
    if (Object.keys(juegosActivos[chatId].elecciones).length === juegosActivos[chatId].jugadores.length) {
      calcularGanador(chatId);
    }
  } else if (opciones.includes(texto)) {
    jugarContraBot(chatId, texto);
  }
});

function jugarContraBot(chatId, eleccionUsuario) {
  const eleccionBot = opciones[Math.floor(Math.random() * opciones.length)];
  let resultado;

  if (eleccionUsuario === eleccionBot) {
    resultado = "¡Empate!";
  } else if (
    (eleccionUsuario === "piedra" && eleccionBot === "tijera") ||
    (eleccionUsuario === "papel" && eleccionBot === "piedra") ||
    (eleccionUsuario === "tijera" && eleccionBot === "papel")
  ) {
    resultado = "¡Ganaste!";
  } else {
    resultado = "¡Perdiste!";
  }

  client.sendMessage(chatId, `Elegiste *${eleccionUsuario}*, el bot eligió *${eleccionBot}*. ${resultado}`);
}

function calcularGanador(chatId) {
  const { elecciones, jugadores } = juegosActivos[chatId];
  let resultados = [];

  for (let i = 0; i < jugadores.length; i++) {
    for (let j = i + 1; j < jugadores.length; j++) {
      const jugador1 = jugadores[i];
      const jugador2 = jugadores[j];
      const eleccion1 = elecciones[jugador1];
      const eleccion2 = elecciones[jugador2];
      let resultado;

      if (eleccion1 === eleccion2) {
        resultado = "Empate";
      } else if (
        (eleccion1 === "piedra" && eleccion2 === "tijera") ||
        (eleccion1 === "papel" && eleccion2 === "piedra") ||
        (eleccion1 === "tijera" && eleccion2 === "papel")
      ) {
        resultado = `@${jugador1.split('@')[0]} gana contra @${jugador2.split('@')[0]}`;
      } else {
        resultado = `@${jugador2.split('@')[0]} gana contra @${jugador1.split('@')[0]}`;
      }
      resultados.push(resultado);
    }
  }

  client.sendMessage(chatId, resultados.join('\n'), { mentions: jugadores });
  delete juegosActivos[chatId];
}

handler.help = ['ppt'];
handler.tags = ['fun'];
handler.command = ['ppt2'];
handler.register = true;
export default handler;

client.initialize();
