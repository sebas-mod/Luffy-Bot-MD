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
        intentos < 6 ? " |  O" : " |",
        intentos < 5 ? " |  /" : intentos < 4 ? " |  /|" : intentos < 3 ? " |  /|\\" : " |",
        intentos < 2 ? " |   /" : intentos < 1 ? " |   / \\" : " |",
        "_|_"
    ];
    return dibujo.join("\n");
}

function juegoTerminado(grupo, jugador, palabra, letrasAdivinadas, intentos) {
    const juego = juegos.get(grupo);
    if (!juego) return;

    const mensaje = ocultarPalabra(palabra, letrasAdivinadas); // Obtener el mensaje actualizado

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

    return ` *AHORCADO*\n${mostrarA
                           
