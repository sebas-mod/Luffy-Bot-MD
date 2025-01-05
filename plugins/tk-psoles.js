let handler = async (m, { conn }) => {
  const imageUrl = 'https://files.catbox.moe/r8gcdz.jpeg'; // URL de la imagen
  const text = `
🌐 *Precios de TK-Coins* 💰 (Precios en soles - S/.)

Estos son los paquetes disponibles:  

🔗 💵 *S/ 4* - 250 TK-Coins  
🔗 💵 *S/ 8* - 550 TK-Coins  
🔗 💵 *S/ 16* - 1100 TK-Coins  
🔗 💵 *S/ 24* - 1650 TK-Coins  
🔗 💵 *S/ 32* - 2200 TK-Coins  
🔗 💵 *S/ 40* - 2500 TK-Coins  
🔗 💵 *S/ 80* - 5600 TK-Coins  
🔗 💵 *S/ 160* - 11,500 TK-Coins  

Selecciona el paquete que más te convenga y aprovecha los bonos ya incluidos. 🚀

💳 *Formas de Pago para Usuarios en Perú*:
1️⃣ Yape: *927803866*  
2️⃣ Plin: *976673519*  
3️⃣ Transferencia Bancaria (BCP, Interbank, BBVA).    

Contáctanos para más detalles sobre tu método de pago preferido. 🛒
  `.trim();
  await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m, null, fake);
};
handler.command = ['psoles'];
handler.tags = ['tk'];
handler.help = ['psoles'];
export default handler;
