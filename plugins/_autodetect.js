let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender?.split('@')[0] || '0000'}:${m.sender?.split('@')[0] || '0000'}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }

  let chat = global.db.data.chats[m.chat] || {}
  let usuario = `@${m.sender?.split('@')[0] || 'usuario'}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg'

  let stubParam = m.messageStubParameters?.[0] || ""
  let stubParamUser = stubParam.includes("@") ? stubParam.split("@")[0] : stubParam

  let nombre = `*${usuario}*\n✨️ Ha cambiado el nombre del grupo\n\n🌻 Ahora el grupo se llama:\n*${stubParam}*`
  let foto = `*${usuario}*\n🚩 Ha cambiado la imagen del grupo`
  let edit = `*${usuario}*\n🌺 Ha permitido que ${stubParam == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo`
  let newlink = `🌸 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*`
  let status = `El grupo ha sido ${stubParam == 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} Por *${usuario}*\n\n💬 Ahora ${stubParam == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje`
  let admingp = `*@${stubParamUser}* Ahora es admin del grupo 🥳\n\n💫 Acción hecha por:\n*» ${usuario}*`
  let noadmingp = `*@${stubParamUser}* Deja de ser admin del grupo 😿\n\n💫 Acción hecha por:\n*» ${usuario}*`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [m.sender, stubParam] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, stubParam] }, { quoted: fkontak })
  }
}
