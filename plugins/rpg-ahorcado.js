const palabras = [
  "gato", "perro", "elefante", "tigre", "ballena", "mariposa", "tortuga", 
  "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino", 
  "delfín", "serpiente", "hámster", "mosquito", "abeja", "negro", "television", 
  "computadora", "botsito", "reggaeton", "economía", "electrónica", "facebook", 
  "WhatsApp", "Instagram", "tiktok", "presidente", "bot", "películas", "gata", "gatabot",
  "javascript", "programacion", "ahorcado", "desarrollo", "internet", "servidor", "cliente", "framework", "biblioteca", 
  "variable", "funcion", "condicional", "bucle", "recursion", "compilador", "interprete", "sintaxis", "algoritmo", "estructura", 
  "dato", "objeto", "clase", "herencia", "polimorfismo", "encapsulacion", "modularidad", "optimizacion", "inteligencia", "artificial", 
  "robotica", "automatizacion", "aprendizaje", "profundo", "redes", "neuronales", "procesador", "memoria", "almacenamiento", "ciberseguridad", 
  "encriptacion", "firewall", "criptografia", "hash", "contraseña", "seguridad", "privacidad", "navegador", "motor", "busqueda", 
  "indexacion", "rendimiento", "escalabilidad", "concurrencia", "asincronia", "promesa", "callback", "evento", "frontend", 
  "backend", "fullstack", "base", "datos", "relacional", "sql", "nosql", "mongodb", "postgresql", "mysql", "sqlite", "docker", 
  "kubernetes", "servidorless", "lambda", "aplicacion", "movil", "android", "ios", "react", "angular", "vue", "svelte", "typescript", 
  "python", "java", "csharp", "golang", "swift", "kotlin", "ruby", "php", "rust"
];

const intentosMaximos = 6;
const gam = new Map();
const esperandoJugadores = new Map();

function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)];
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
    intentos < 6 ? " |  😵" : " |", 
    intentos < 5 ? " |  /" : " |",
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
    return `😵 *¡PERDISTE!*\n\nLa palabra era: *\"${juego.palabra}\"*\n\n${mostrarAhorcado(juego.intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  if (!juego.mensaje.includes("_")) {
    gam.delete(juego.id);
    return `🎉 *¡FELICIDADES!*\n\n🎯 Palabra correcta: *\"${juego.palabra}\"*\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  return `🎮 *AHORCADO*\n${mostrarAhorcado(juego.intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n✍️ *Progreso:* ${juego.mensaje}\n📉 Intentos restantes: *${juego.intentos}*\n👤 Turno de: *@${juego.jugadores[juego.turno]}*\n\n¡Escribe una letra para continuar!`;
}

let handler = async (m, { conn }) => {
  if (esperandoJugadores.has(m.chat)) {
    const jugadores = esperandoJugadores.get(m.chat);
    if (!jugadores.includes(m.sender)) {
      jugadores.push(m.sender);
      conn.sendMessage(m.chat, { text: `✅ @${m.sender} se ha unido a la partida. (${jugadores.length}/3)`, mentions: jugadores });
    }
    if (jugadores.length === 3) {
      esperandoJugadores.delete(m.chat);
      const palabra = elegirPalabraAleatoria();
      const letrasAdivinadas = [];
      const intentos = intentosMaximos;
      const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
      gam.set(m.chat, { id: m.chat, palabra, letrasAdivinadas, intentos, mensaje, jugadores, turno: 0 });
      conn.sendMessage(m.chat, { text: `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n📉 Intentos restantes: *${intentos}*\n👤 Turno de: *@${jugadores[0]}*\n\n¡Escribe una letra para comenzar!`, mentions: jugadores });
    }
    return;
  }
  esperandoJugadores.set(m.chat, [m.sender]);
  conn.sendMessage(m.chat, {
    text: `🎮 *AHORCADO - Esperando jugadores*\n\nSe necesitan 3 jugadores para comenzar.`,
    footer: "Presiona el botón para unirte",
    buttons: [{ buttonId: "!unirme", buttonText: { displayText: "Entrar a la partida" }, type: 1 }]
  });
};

handler.command = ["ahorcado", "unirme"];
export default handler;
