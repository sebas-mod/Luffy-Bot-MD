let handler = async (m, { conn }) => {
  const imageUrls = [
    'https://files.catbox.moe/7x0gvu.jpeg',
    'https://files.catbox.moe/mrlhnr.jpeg',
    'https://files.catbox.moe/irsabw.jpeg'
  ];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  const text = `
🌟 *Plan TK-Vip3* 🌟

📊 *Especificaciones del Plan*:
- *CPU*: 2 vCores  
- *RAM*: 2000 MB  
- *Disco*: 9000 MB  
- *Bases de datos MySQL*: 1  

📝 *Descripción*:  
Plan ideal para proyectos fuertes y exigentes.

💰 *Requisitos*:
- *TK-Coins requeridos*: 500  
- *Precio total (TK-Coins)*: 750.00  

📍 Consiguelo ahora
> (https://dash.tk-joanhost.com/servers/create).  

💡 ¡Haz que tu proyecto despegue con el Plan TK-Vip3! 🚀
  `.trim();

  await conn.sendFile(m.chat, randomImageUrl, 'tk-vip3.jpg', text, m, null, fake);
};

handler.command = ['vip3'];
handler.tags = ['tk'];
handler.help = ['vip3'];
export default handler;

