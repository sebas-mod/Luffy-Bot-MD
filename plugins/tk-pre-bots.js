let handler = async (m, { conn }) => {
  const imageUrl = 'https://files.catbox.moe/p48khr.jpeg'; // URL de la imagen
  const text = `
🌐 *Prebots Disponibles en TK-Host* 🖥️

Aquí tienes la lista completa de los prebots que puedes utilizar:

🌟 *Lista de Prebots Disponibles* 🌟

1. KatashiBot-MD (TK-Oficial)
2. Admin-TK (TK-Oficial)
3. GenesisBot-MD (TK-Oficial)
4. Megumin-MD
5. Waguri-Ai
6. Ai-hoshino
7. CrowBot-Ai
8. Kakaroto-Bot-MD
9. Yuki_Suou-Bot
10. Sylph | Wa Bot

🔗 *Crea tu servidor con tu prebot favorito aquí:*
> (https://dash.tk-joanhost.com/servers/create)

¡Selecciona tu prebot favorito y comienza a configurarlo ahora mismo!

  `.trim();
  await conn.sendFile(m.chat, imageUrl, 'pagina-panel.jpg', text, m, null, fake);
};
handler.command = ['prebots'];
handler.tags = ['tk'];
handler.help = ['prebots'];
export default handler;
