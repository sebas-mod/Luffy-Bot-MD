conn.sendMessage(m.cht, {
            document: fs.readFileSync("./package.json"),
            fileName: 'Sock',
            fileLength: "99999999999",
            pageCount: "2024",
            caption: `qq`,
            mimetype: 'image/png',
            jpegThumbnail: await sock.resize('https://telegra.ph/file/61d0cf9605cf904f6e5f9.jpg', 400, 400),
      contextInfo: {
      externalAdReply: {
      title: `Sock MD || Menu Group`,
      body: `Library: Whiskeysockets/Baileys`,
      thumbnailUrl: 'https://telegra.ph/file/b0d002bc3bf1772503d67.jpg',
      sourceUrl: 'https://flarex.cloud/',
      mediaType: 1,
      renderLargerThumbnail: true, 
        },
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `593986755613@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363312011221059@newsletter',
            serverMessageId: null,
            newsletterName: 'FlarexCloud x Sock 1.0 Versions'
        }
    }
}, { quoted:m });