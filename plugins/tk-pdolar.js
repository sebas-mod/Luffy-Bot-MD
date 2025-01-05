let handler = async (m, { conn }) => {
  const imageUrl = 'https://files.catbox.moe/r8gcdz.jpeg'; // URL de la imagen
  const text = `
🌐 *Precios de TK-Coins* 💰

Estos son los paquetes disponibles:  

🔗 💵 *$2.43* - 550 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/VZJ5Ztji9vxIdMLdZKxE1)

🔗 💵 *$4.55* - 1100 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/0UeWPiZm6HQoYkykj3Sjw)

🔗 💵 *$6.66* - 1650 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/KPLsZompbqXpC_zzLnamv)

🔗 💵 *$8.77* - 2200 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/Xo8MdwPY-JF66KmKVj0ad)

🔗 💵 *$10.89* - 2500 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/YJAuZCsn7BcjjR3UCa6ov)

🔗 💵 *$21.46* - 5600 TK-Coins  
> (https://dash.tk-joanhost.com/checkout/HLxPvvhVLs0Dc5JUpLUk3)

🔗 💵 *$42.60* - 11,500 TK-Coins 
> (https://dash.tk-joanhost.com/checkout/DcbIC-I2ONZDozRzfOZOo)

Selecciona el paquete que más te convenga y aprovecha los bonos ya incluidos. 🚀
  `.trim();
  await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m);
};
handler.command = ['pdolar'];
handler.tags = ['tk'];
handler.help = ['pdolar'];
export default handler;
