let handler = async (m, { conn }) => {
  const imageUrls = [
    'https://pomf2.lain.la/f/ay62wjkb.jpg',
    'https://pomf2.lain.la/f/colvnnrh.jpg',
    'https://pomf2.lain.la/f/sp1ikzyi.jpg'
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

  await conn.sendFile(m.chat, randomImageUrl, 'tk-vip3.jpg', text, m);
};

handler.command = ['vip3'];
handler.tags = ['tk'];
handler.help = ['vip3'];
export default handler;

