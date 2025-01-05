let handler = async (m, { conn }) => {
  const imageUrls = [
    'https://pomf2.lain.la/f/ay62wjkb.jpg',
    'https://pomf2.lain.la/f/colvnnrh.jpg',
    'https://pomf2.lain.la/f/sp1ikzyi.jpg'
  ];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  const text = `
🌟 *Plan TK-Dios* 🌟

📊 *Especificaciones del Plan*:
- *CPU*: 3 vCores  
- *RAM*: 3500 MB  
- *Disco*: 18000 MB  
- *Bases de datos MySQL*: 1  

📝 *Descripción*:  
¿En serio? Ten toda mi VPS, es tuya. Ideal para proyectos de máxima exigencia.

💰 *Requisitos*:
- *TK-Coins requeridos*: 1250  
- *Precio total (TK-Coins)*: 1500.00  

📍 Consiguelo ahora
> (https://dash.tk-joanhost.com/servers/create).  

💡 ¡Conquista el universo de los proyectos con el Plan TK-Dios! 🚀
  `.trim();

  await conn.sendFile(m.chat, randomImageUrl, 'tk-dios.jpg', text, m, null, fake);
};

handler.command = ['dios'];
handler.tags = ['planes'];
handler.help = ['dios'];
export default handler;


