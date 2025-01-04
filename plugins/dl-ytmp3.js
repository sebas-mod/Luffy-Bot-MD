import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("❀ Por favor, ingresa una URL válida de YouTube.");
  }

  await m.react('🕓');

  let ytUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytUrlRegex.test(text)) {
    return m.reply("❀ La URL ingresada no es válida. Asegúrate de que sea un enlace de YouTube.");
  }

  try {
    // Depurar entrada
    console.log(`URL ingresada: ${text}`);

    let apiUrl = `https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(text)}`;
    console.log(`Llamando a la API: ${apiUrl}`);

    let api = await fetch(apiUrl);
    let json = await api.json();

    if (!json.result) {
      return m.reply("❀ No se pudo obtener información del video. Inténtalo nuevamente.");
    }

    let { quality, thumbnail, title, download_url } = json.result;

    // Verificar valores devueltos
    if (!download_url || !title) {
      return m.reply("❀ Información incompleta recibida de la API.");
    }

    let img = null;
    if (thumbnail) {
      try {
        img = await (await fetch(thumbnail)).buffer();
      } catch {
        console.warn("❀ Error al descargar la miniatura.");
      }
    }

    await m.react('✅');

    // Enviar archivo como documento
    await conn.sendMessage(
      m.chat,
      {
        document: { url: download_url },
        fileName: `${title}.mp3`,
        fileLength: `${quality}`,
        caption: `❀ ${title}`,
        mimetype: 'audio/mpeg',
        jpegThumbnail: img,
      },
      { quoted: m }
    );

    // Enviar archivo como audio
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download_url },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mp4',
      },
      { quoted: m }
    );
  } catch (error) {
    console.error("❀ Error en el handler:", error);
    m.reply("❀ Hubo un error al procesar la URL. Inténtalo nuevamente.");
  }
};

handler.help = ['ytmp3 *<link yt>*'];
handler.tags = ['dl'];
handler.command = ['ytmp3', 'yta', 'fgmp3'];

export default handler;