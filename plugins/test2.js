< (async () => {

const { prepareWAMessageMedia, generateWAMessageFromContent } = require("baileys");
const { randomBytes } = require("crypto");

const { imageMessage } = await prepareWAMessageMedia({
    image: { url: "https://i.pinimg.com/736x/1c/b9/dc/1cb9dce731c1544b0bd018b02567fd1f.jpg" }
}, { upload: sock.waUploadToServer });


const buttons = [
  {
    buttonId: ".menu", 
    buttonText: { 
      displayText: 'Menu' 
    }
  }, {
    buttonId: ".ping", 
    buttonText: {
      displayText: "Ping"
    }
  }
]

const buttonsMessage = {
  image: imageMessage,  
  caption: "humm", 
  footer: "join trend", 
  buttons: buttons,
  viewOnce: true, 
  headerType: 1
}

return await sock.sendMessage(m.cht, buttonsMessage)
})()