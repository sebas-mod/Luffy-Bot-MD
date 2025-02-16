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
    intentos < 3 ? " |  /|\\" : " |",
    intentos < 2 ? " |   /" : " |",
    intentos < 1 ? " |   / \\" : " |",
    "_|_"
  ];
  return dibujo.join("\n");
}

function juegoTerminado(juego) {
  if (juego.intentos === 0) {
    gam.delete(juego.id);
    return `😵 *¡PERDISTE!*

La palabra era: *"${juego.palabra}"*

${mostrarAhorcado(juego.intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  if (!juego.mensaje.includes("_")) {
    gam.delete(juego.id);
    return `🎉 *¡FELICIDADES!*

🎯 Palabra correcta: *"${juego.palabra}"*

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
  }
  return `🎮 *AHORCADO*
${mostrarAhorcado(juego.intentos)}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

✍️ *Progreso:* ${juego.mensaje}
📉 Intentos restantes: *${juego.intentos}*
👤 Turno de: *@${juego.jugadores[juego.turno]}*

¡Escribe una letra para continuar!`;
}

let handler = async (m, { conn, participants }) => {
  if (gam.has(m.chat)) return conn.reply(m.chat, "⚠️ Ya hay un juego en curso en este grupo.", m);
  
  const jugadores = participants.map(p => p.id).slice(0, 3);
  if (jugadores.length < 3) return conn.reply(m.chat, "⚠️ Se necesitan al menos 3 jugadores para comenzar.", m);
  
  const palabra = elegirPalabraAleatoria();
  const letrasAdivinadas = [];
  const intentos = intentosMaximos;
  const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
  
  gam.set(m.chat, { id: m.chat, palabra, letrasAdivinadas, intentos, mensaje, jugadores, turno: 0 });
  
  conn.reply(m.chat, `🪓 *AHORCADO*

✍️ Adivina la palabra:
${mensaje}

📉 Intentos restantes: *${intentos}*
👤 Turno de: *@${jugadores[0]}*

¡Escribe una letra para comenzar!`, m, { mentions: jugadores });
};

handler.before = async (m, { conn }) => {
  const juego = gam.get(m.chat);
  if (!juego || m.sender !== juego.jugadores[juego.turno]) return;
  
  const letra = m.text.toLowerCase();
  if (!/^[a-z]$/.test(letra)) return conn.reply(m.chat, "⚠️ *Solo puedes enviar una letra a la vez.*", m);
  if (juego.letrasAdivinadas.includes(letra)) return conn.reply(m.chat, `⚠️ Ya intentaste con la letra "${letra}". Prueba otra.`, m);
  
  juego.letrasAdivinadas.push(letra);
  if (!juego.palabra.includes(letra)) juego.intentos -= 1;
  
  juego.mensaje = ocultarPalabra(juego.palabra, juego.letrasAdivinadas);
  juego.turno = (juego.turno + 1) % juego.jugadores.length;
  
  const respuesta = juegoTerminado(juego);
  conn.reply(m.chat, respuesta, m, { mentions: [juego.jugadores[juego.turno]] });
};

handler.help = ["ahorcado"];
handler.tags = ["rpg"];
handler.command = ["ahorcado"];
handler.register = true;

export default handler;
