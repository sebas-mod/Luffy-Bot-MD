let handler = async (m, { conn }) => {
  const imageUrls = [
    'https://files.catbox.moe/7x0gvu.jpeg',
    'https://files.catbox.moe/mrlhnr.jpeg',
    'https://files.catbox.moe/irsabw.jpeg'
  ];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  const text = `
🌟 *Plan TK-Vip4* 🌟

📊 *Especificaciones del Plan*:
- *CPU*: 2.25 vCores  
- *RAM*: 2500 MB  
- *Disco*: 12000 MB  
- *Bases de datos MySQL*: 1  

📝 *Descripción*:  
Perfecto para proyectos avanzados que requieren mayor rendimiento.

💰 *Requisitos*:
- *TK-Coins requeridos*: 750  
- *Precio total (TK-Coins)*: 1000.00  

📍 Consiguelo ahora
> (https://dash.tk-joanhost.com/servers/create).  

💡 ¡Impulsa tus proyectos avanzados con el Plan TK-Vip4! 🚀
  `.trim();

  await conn.sendFile(m.chat, randomImageUrl, 'tk-vip4.jpg', text, m, null, fake);
};

handler.command = ['vip4'];
handler.tags = ['tk'];
handler.help = ['vip4'];
export default handler;
