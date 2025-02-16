const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardingMessageKey,
  BufferJSON,
  delay,
  PHONENUMBER_ID,
  WA_DEFAULT_EPHEMERAL,
  proto,
} = require("@whiskeysockets/baileys");
const PQueue = require("p-queue");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const moment = require('moment-timezone'); // Importa moment-timezone

const {
  smsg,
  formatDate,
  getSizeMedia,
  fetchBuffer,
  getBuffer,
  getRandom,
} = require("./lib/myfunc");

const palabras = [
  "casa", "árbol", "sol", "luna", "estrella", "perro", "gato", "elefante", "tigre", "león",
  "vaca", "caballo", "oveja", "cerdo", "gallina", "pato", "conejo", "tortuga", "serpiente", "rana",
  "pez", "pájaro", "mariposa", "abeja", "hormiga", "araña", "mosca", "mosquito", "cucaracha", "ratón",
  "ciudad", "pueblo", "calle", "avenida", "plaza", "parque", "escuela", "hospital", "iglesia", "tienda",
  "comida", "bebida", "fruta", "verdura", "carne", "pescado", "pan", "agua", "leche", "jugo",
  "ropa", "zapato", "camisa", "pantalón", "falda", "vestido", "chaqueta", "gorro", "guantes", "bufanda",
  "mueble", "silla", "mesa", "cama", "armario", "sofá", "lámpara", "espejo", "cuadro", "alfombra",
  "libro", "cuaderno", "lápiz", "pluma", "regla", "mochila", "goma", "tijeras", "pegamento", "papel",
  "deporte", "fútbol", "baloncesto", "tenis", "voleibol", "natación", "ciclismo", "atletismo", "gimnasia", "yoga",
  "color", "rojo", "azul", "amarillo", "verde", "naranja", "morado", "rosa", "negro", "blanco",
  "tiempo", "día", "noche", "mañana", "tarde", "ayer", "hoy", "mañana", "semana", "mes",
  "profesión", "doctor", "enfermera", "profesor", "abogado", "ingeniero", "arquitecto", "policía", "bombero", "músico", "artista",
  "país", "México", "España", "Argentina", "Estados Unidos", "Canadá", "Francia", "Italia", "Alemania", "Japón", "China",
  "animal", "perro", "gato", "elefante", "tigre", "león", "vaca", "caballo", "oveja", "cerdo", "gallina",
  "computadora", "teléfono", "internet", "red", "software", "hardware", "teclado", "ratón", "monitor", "impresora",
  "cámara", "foto", "video", "música", "película", "serie", "juego", "libro", "revista", "periódico",
  "árbol", "flor", "hoja", "fruta", "semilla", "raíz", "tronco", "rama", "nido", "hongo",
  "cielo", "nube", "lluvia", "viento", "sol", "luna", "estrella", "planeta", "galaxia", "universo",
  "casa", "edificio", "puente", "carretera", "tren", "avión", "barco", "coche", "bicicleta", "moto"
];

const intentosMaximos = 6;
const gam = new Map();
const esperandoJugadores = new Map();

function elegirPalabraAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * palabras.length);
  return palabras[indiceAleatorio];
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra
    .split('')
    .map(letra => letrasAdivinadas.includes(letra) ? letra : '_')
    .join(' ');
}

function mostrarAhorcado(intentos) {
  const dibujo = [
    " ____",
    " |  |",
    intentos < 6 ? " |  " : " |",
    intentos < 5 ? " |  / " : " |",
    intentos < 4 ? " |  /|" : " |",
    intentos < 3 ? " |  /\\" : " |",
    intentos < 2 ? " |   /" : " |",
    intentos < 1 ? " |   / \\" : " |",
    "_|_"
  ];
  return dibujo.join("\n");
}

function juegoTerminado(juego) {
  if (juego.intentos === 0) {
    gam.delete(juego.id);
    return ` *¡PERDISTE!*\n\nLa palabra era: *"<span class="math-inline">\{juego\.palabra\}"\*\\n\\n</span>{mostrarAhorcado(juego.intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  if (!juego.mensaje.includes("_")) {
    gam.delete(juego.id);
    return ` *¡FELICIDADES!*\n\n Palabra correcta: *"${juego.palabra}"*\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  return ` *AHORCADO*\n${mostrarAhorcado(juego.intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n✍️ *Progreso:* <span class="math-inline">\{juego\.mensaje\}\\n Intentos restantes\: \*</span>{juego.intentos}*\n Turno de: *@${juego.jugadores[juego.turno].split('@')[0]}*\n\n¡Escribe una letra para continuar!`;
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
    getMessage: async (key) => {
      const msg = await sock.loadMessage(key);
      return msg?.message || undefined;
    },
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error).output.payload.message;
      console.log("Connection Closed Because", reason);
      // Reconnect if the connection was closed unexpectedly
      if (reason !== "Stream is not writable") {
        await connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("Connection Open");
      return;
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    try {
      if (!m.messages) return;
      let msg = m.messages[0];

      if (msg.key.remoteJid === "status@broadcast") return;
      if (!msg.message) return;
      if (msg.key && msg.key.remoteJid === "12036303251240912@g.us") return;

      let budi = msg.message.conversation;

      if (budi === "p") return;

      const from = msg.key.remoteJid;
      const type = Object.keys(msg.message)[0];
      const hora = moment(msg.messageTimestamp * 1000).tz("America/Argentina/Buenos_Aires").format("HH:mm:ss");

      if (
        (type === "extendedTextMessage" &&
          msg.message.extendedTextMessage.contextInfo?.mentionedJid.includes(
            sock.user.id
          )) ||
        type === "conversation" ||
        type === "imageMessage
