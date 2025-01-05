let handler = async (m, { conn }) => {
  const imageUrls = [
    'https://files.catbox.moe/7x0gvu.jpeg',
    'https://files.catbox.moe/mrlhnr.jpeg',
    'https://files.catbox.moe/irsabw.jpeg'
  ];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  const text = `
🌟 *Plan TK-Vip2* 🌟

📊 *Especificaciones del Plan*:
- *CPU*: 1.75 vCores  
- *RAM*: 1500 MB  
- *Disco*: 6000 MB  
- *Bases de datos MySQL*: 1  

📝 *Descripción*:  
Plan diseñado para bots avanzados con capacidad para manejar múltiples conexiones.

💰 *Requisitos*:
- *TK-Coins requeridos*: 250  
- *Precio total (TK-Coins)*: 500.00  

⚙️ *Características Adicionales*:
- Soporte para la creación de servidores *JavaScript*.  
- Implementación de *Prebots Oficiales*.  

📍 Consiguelo ahora
> (https://dash.tk-joanhost.com/servers/create).  

💡 ¡Lleva tu bot al siguiente nivel con el Plan TK-Vip2! 🚀
  `.trim();

  await conn.sendFile(m.chat, randomImageUrl, 'tk-vip2.jpg', text, m, null, fake);
};

handler.command = ['vip2'];
handler.tags = ['tk'];
handler.help = ['vip2'];
export default handler;

