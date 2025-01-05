let handler = async (m, { conn }) => {
  const imageUrl = 'https://files.catbox.moe/x48r2q.jpeg'; // URL de la imagen promocional
  const text = `
🎉 *Promociones Actuales en TK-HOST* 🏷️

💎 *Ofertas exclusivas en planes y TK-Coins*:

🔹 *Planes de Hosting:*
   - 🌟 20% de descuento en planes anuales.
   - 🌟 1 fotopata de mi prima si compran.

🔹 **TK-Coins:**
   - $2.43: 500 +10% TK-Coins.
   - $4.55: 1000 +10% TK-Coins.
   - $6.66: 1500 +10% TK-Coins.
   - $8.77: 2000 +10% TK-Coins.
   - $10.89: 2500 +10% TK-Coins.
   - $21.46: 5000 +12% TK-Coins.
   - $42.60: 10,000 +15% TK-Coins.

📍 *Promoción válida hasta el 31 de diciembre*.

✨ Más información y compras en: 
> [Tienda TK-HOST]
> (https://dash.tk-joanhost.com/store)

🚀 ¡Aprovecha ahora y haz crecer tu proyecto con nosotros!
  `.trim();

  await conn.sendFile(m.chat, imageUrl, 'promociones.jpg', text, m);
};

handler.command = ['promociones'];
handler.tags = ['tk'];
handler.help = ['promociones'];
export default handler;
