let handler = async (m, { conn }) => {
  const imageUrl = 'https://files.catbox.moe/ea82hr.jpeg'; // URL de la imagen
  const text = `
🌐 *Panel de Gestión de Servidores* 🛠️

🔗 [Acceder al Panel de Gestión]
> (https://panel.tk-joanhost.com)

📌 *Funciones disponibles*:  
- 🔧 *Gestionar servidores*: Revisa el estado y controla tus servicios.  
- ✏️ *Editar archivos*: Modifica configuraciones y archivos fácilmente.  
- 🔄 *Reinstalar servidor*: Restablece tu servidor en caso necesario.  
- 📊 *Estadísticas y monitoreo**: Verifica el rendimiento en tiempo real.
  `.trim();
  await conn.sendFile(m.chat, imageUrl, 'panel-gestion.jpg', text, m, null, fake);
};
handler.command = ['panel'];
handler.tags = ['tk'];
handler.help = ['panel'];
export default handler;
