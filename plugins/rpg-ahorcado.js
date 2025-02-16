const palabras = [
    // ... (array de palabras)
];

const intentosMaximos = 6;
const gam = new Map();
const esperandoJugadores = new Map();

// ... (funciones elegirPalabraAleatoria, ocultarPalabra, mostrarAhorcado)

function juegoTerminado(juego) {
    // ... (sin cambios)
}

let handler = async (m, { conn }) => {
    const chat = m.chat; // Obtener el ID del chat
    const jugador = m.sender; // Obtener el ID del jugador

    if (esperandoJugadores.has(chat)) {
        const jugadores = esperandoJugadores.get(chat);

        // Evitar que el mismo jugador se una varias veces
        if (!jugadores.includes(jugador)) {
            jugadores.push(jugador);
            conn.sendMessage(chat, { text: `✅ @${jugador.split('@')[0]} se ha unido a la partida. (${jugadores.length}/3)`, mentions: jugadores });
        }

        if (jugadores.length === 3) {
            esperandoJugadores.delete(chat);
            const palabra = elegirPalabraAleatoria();
            const letrasAdivinadas = [];
            const intentos = intentosMaximos;
            const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
            const turno = Math.floor(Math.random() * 3); // Seleccionar turno aleatorio
            gam.set(chat, { id: chat, palabra, letrasAdivinadas, intentos, mensaje, jugadores, turno });

            // Enviar mensaje con botones
            const botones = jugadores.map(jugador => ({ buttonId: "unirme", buttonText: { displayText: "Entrar a la partida" }, type: 1 }));
            conn.sendMessage(chat, {
                text: `🪓 *AHORCADO*\n\n✍️ Adivina la palabra:\n${mensaje}\n\n Intentos restantes: *${intentos}*\n Turno de: *@${jugadores[turno].split('@')[0]}*\n\n¡Escribe una letra para comenzar!`,
                mentions: jugadores,
                buttons: botones, // Agregar botones al mensaje
                headerType: 1
            });
        }
        return;
    }

    if (gam.has(chat)) {
        const juego = gam.get(chat);

        // ... (código para manejar letras ingresadas)
    } else {
        // Enviar mensaje con botones para unirse
        const botones = [{ buttonId: "unirme", buttonText: { displayText: "Unirme a la partida" }, type: 1 }];
        esperandoJugadores.set(chat, [jugador]);
        conn.sendMessage(chat, {
            text: ` *AHORCADO - Esperando jugadores*\n\nSe necesitan 3 jugadores para comenzar.`,
            footer: "Presiona el botón para unirte",
            buttons: botones, // Agregar botones al mensaje
            headerType: 1
        });
    }
};

handler.command = ["ahorcado", "unirme"];
export default handler;
