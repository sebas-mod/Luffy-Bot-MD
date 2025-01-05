let handler = async (m, { conn, participants, groupMetadata, args }) => {
  const imageUrl = 'https://files.catbox.moe/ea82hr.jpeg'; // Cambia por la URL de la imagen adecuada
  const fallbackImage = './staff.jpg'; // Ruta de imagen local como respaldo

  // Obtener los administradores del grupo
  const groupAdmins = participants.filter(p => p.admin);
  if (groupAdmins.length === 0) return m.reply('No hay administradores en este grupo.');

  // Formatear el número de WhatsApp con espacios
  const formatPhoneNumber = number => {
    return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
  };

  // Crear la lista de administradores con formato adecuado
  const listAdmin = groupAdmins.map((v, i) => {
    const number = formatPhoneNumber(v.id.split('@')[0]); // Número formateado
    const name = conn.getName(v.id) || 'Sin Nombre'; // Nombre del administrador
    return `*${i + 1}.* ${number} (${name})`;
  }).join('\n');

  // Obtener el propietario del grupo
  const ownerId = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || '';
  const ownerNumber = ownerId ? formatPhoneNumber(ownerId.split('@')[0]) : 'No disponible';
  const ownerName = ownerId ? conn.getName(ownerId) || 'Sin Nombre' : 'No disponible';

  // Mensaje estructurado
  const text = `
🌟 *Staff del Grupo* 🌟

👑 *Propietario del Grupo*  
- ${ownerName} (${ownerNumber})

👥 *Administradores*  
${listAdmin}

🛠️ *Soporte Técnico* 👩‍💻  
¿Problemas o preguntas? Nuestro equipo está listo para ayudarte:

📩 Email: joanbottk@gmail.com  
📞 WhatsApp: +51 910 234 457  
🌐 Pagina Oficial  
> https://dash.tk-joanhost.com/home

✨ ¡Tu éxito es nuestra prioridad! 💪
  `.trim();

  try {
    // Intentar enviar la imagen desde la URL
    await conn.sendFile(m.chat, imageUrl, 'soporte.jpg', text, m, null, fake);
  } catch (err) {
    console.error('Error al enviar la imagen desde la URL:', err.message);
    m.reply('No se pudo cargar la imagen desde la URL. Enviando imagen de respaldo...');
    try {
      // Usar la imagen local como respaldo
      await conn.sendFile(m.chat, fallbackImage, 'soporte.jpg', text, m, null, fake);
    } catch (fallbackErr) {
      console.error('Error al enviar la imagen de respaldo:', fallbackErr.message);
      m.reply('No se pudo cargar ninguna imagen. Por favor, contacta al soporte.');
    }
  }
};

handler.command = /^(staff)$/i; // Comandos activadores
handler.tags = ['tk'];
handler.help = ['staff'];
handler.group = true;
export default handler;
