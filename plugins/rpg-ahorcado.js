const palabras = [
    "gato", "perro", "elefante", "tigre", "ballena", "mariposa", "tortuga",
    "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo", "pingüino",
    "delfín", "serpiente", "hámster", "mosquito", "abeja", "negro", "television",
    "computadora", "botsito", "reggaeton", "economía", "electrónica", "facebook",
    "WhatsApp", "Instagram", "tiktok", "presidente", "bot", "películas", "gata", "gatabot"
];

const intentosMaximos = 6;
const juegos = new Map(); // Mapa para almacenar los juegos de cada grupo

function elegirPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function ocultarPalabra(palabra, letrasAdivinadas) {
    let palabraOculta = "";
    for (const letra of palabra) {
        palabraOculta += letrasAdivinadas.includes(letra) ? `${letra} ` : "_ ";
    }
    return palabraOculta.trim();
}

function mostrarAhorcado(intentos) {
    const dibujo = [
        " ____",
        " |  |",
        intentos < 6 ? " |  " : " |",
        intentos < 5 ? " |  /" : intentos < 4 ? " |  /|" : intentos < 3 ? " |  /|\\" : " |",
        intentos < 2 ? " |   /" : intentos < 1 ? " |   / \\" : " |",
        "_|_"
    ];
    return dibujo.join("\n");
}

function juegoTerminado(grupo, jugador, palabra, letrasAdivinadas, intentos) {
    const juego = juegos.get(grupo);
    if (!juego) return;

    if (intentos === 0) {
        juego.jugadores.delete(jugador);
        if (juego.jugadores.size === 0) {
            juegos.delete(grupo);
        }
        return ` *¡PERDISTE!*\n\nLa palabra era: *"<span class="math-inline">\{palabra\}"\*\\n\\n</span>{mostrarAhorcado(intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
    }

    if (!mensaje.includes("_")) {
        const expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 6500) : Math.floor(Math.random() * 350);
        global.db.data.users[jugador].exp += expGanada;
        juego.jugadores.delete(jugador);
        if (juego.jugadores.size === 0) {
            juegos.delete(grupo);
        }
        return ` *¡FELICIDADES!*\n\n Palabra correcta: *"<span class="math-inline">\{palabra\}"\*\\n Has ganado\: \*</span>{expGanada} EXP*\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`;
    }

    return ` *AHORCADO*\n${mostrarAhorcado(intentos)}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n✍️ *Progreso:* <span class="math-inline">\{mensaje\}\\n\\n Intentos restantes\: \*</span>{intentos}*\n\n¡Escribe otra letra para continuar!`;
}

let handler = async (m, { conn, text }) => {
    const grupo = m.chat; // Identificador del grupo
    const jugador = m.sender; // Identificador del jugador

    if (text === "unir") {
        if (juegos.has(grupo) && juegos.get(grupo).jugadores.has(jugador)) {
            return conn.reply(m.chat, "⚠️ Ya estás en la partida.", m);
        }

        if (!juegos.has(grupo)) {
            juegos.set(grupo, { palabra: null, letrasAdivinadas: [], jugadores: new Map(), esperando: true });
        }

        const juego = juegos.get(grupo);
        juego.jugadores.set(jugador, { intentos: intentosMaximos });

        const numJugadores = juego.jugadores.size;
        conn.reply(m.chat, `✅ Te has unido a la partida. ¡Esperando jugadores! (${numJugadores}/3)`, m);

        if (numJugadores >= 3) {
            juego.palabra = elegirPalabraAleatoria();
            juego.esperando = false;
            const mensaje = ocultarPalabra(juego.palabra, juego.letrasAdivinadas);
            const text = `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n¡La partida ha comenzado!`;
            conn.reply(m.chat, text, m);
        }
        return;
    }

    if (juegos.has(grupo) && juegos.get(grupo).jugadores.has(jugador)) {
        return conn.reply(m.chat, "⚠️ Ya tienes un juego en curso en este grupo. ¡Termina ese primero!", m);
    }

    const juego = juegos.get(grupo);

    if (juego && juego.esperando && juego.jugadores.size >= 3) {
        juego.palabra = elegirPalabraAleatoria();
        juego.esperando = false;
        const mensaje = ocultarPalabra(juego.palabra, juego.letrasAdivinadas);
        const text = `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n¡La partida ha comenzado!`;
        conn.reply(m.chat, text, m);
    } else if (juego && juego.esperando) {
        const numJugadores = juego.jugadores.size;
        conn.reply(m.chat, `⚠️ Espera a que se unan más jugadores. (${numJugadores}/3)`, m);
        return;
    }

    const palabra = elegirPalabraAleatoria();
    const letrasAdivinadas = [];
    const intentos = intentosMaximos;
    const mensaje = ocultarPalabra(palabra, letrasAdivinadas);

    if (!juegos.has(grupo)) {
        juegos.set(grupo, { palabra, letrasAdivinadas, jugadores: new Map() });
    }

    const juego = juegos.get(grupo);
    juego.jugadores.set(jugador, { intentos });

    const text = `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n Intentos restantes: *${intentos}*\n\n¡Escribe una letra para comenzar!`;
    conn.reply(m.chat, text, m);
};

handler.before = async (m, { conn }) => {
    const grupo = m.chat;
    const jugador = m.sender;
    const juego = juegos.get(grupo);

    if (!juego || !juego.jugadores.has(jugador)) return;

    const { palabra, letrasAdivinadas } = juego;
    const { intentos } = juego.jugadores.get(jugador);

    if (m.text.length === 1 && /^[a-zA-Z]$/.test(m.text)) {
        const letra = m.text.toLowerCase();
        if (!letrasAdivinadas.includes(letra)) {
            letrasAdivinadas.push(letra);
            if (!palabra.includes(letra)) {
                juego.jugadores.get(jugador).intentos -= 1;
            }
        }

        const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
        const respuesta = juegoTerminado(grupo, jugador, palabra, letrasAdivinadas, juego.jugadores.get(jugador).intentos);

        if (juego.jugadores.get(jugador).intentos === 0 || !mensaje.includes("_")) {
            conn.reply(m.chat, respuesta, m);
        } else {
            const letrasErradas = letrasAdivinadas.filter((letra) => !palabra.includes(letra)).join(", ");
            conn.reply(m.chat, `${respuesta}\n\n❌ *Letras incorrectas usadas:* ${letrasErradas || "Ninguna"}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`, m);
        }
    } else {
        conn.reply(m.chat, "⚠️ *Solo puedes enviar una letra a la vez.*", m);
    }
};

handler.help = ["ahorcado"];
