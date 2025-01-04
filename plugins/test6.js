import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  await m.react('🕒')
  if (!mime.startsWith('image/')) {
    return m.reply('Responde a una *Imagen.*')
  }

  let media = await q.download()
  let formData = new FormData()
  formData.append('file', media, { filename: 'file' })

  try {
    // Subir imagen a Free Image Host
    let freeImageHostApi = await fetch('https://www.freeimage.host/upload', {
      method: 'POST',
      body: formData,
    })
    let freeImageHostData = await freeImageHostApi.json()

    // Verificar si la respuesta de Free Image Host es correcta
    if (!freeImageHostData || !freeImageHostData.url) {
      throw new Error('Error al obtener respuesta de Free Image Host')
    }

    await m.react('✅')

    let txt = '`F R E E  I M A G E  H O S T - U P L O A D E R`\n\n'

    // Información de Free Image Host
    txt += `*🔖 Titulo* : ${q.filename || 'x'}\n`
    txt += `*🔖 Enlace* : ${freeImageHostData.url}\n`
    txt += `*🔖 Delete* : ${freeImageHostData.delete_url}\n\n`
    txt += `© By: Genesis`

    // Enviar el archivo
    await conn.sendFile(m.chat, freeImageHostData.url, 'freeimage.jpg', txt, m, null, fake)

  } catch (error) {
    console.error('Error al procesar la imagen:', error)
    await m.reply('Hubo un error al subir la imagen. Revisa la consola para más detalles.')
    await m.react('❌')
  }
}

handler.tags = ['convertir']
handler.help = ['tofreeimage']
handler.command = /^(tourl2|tofreeimage)$/i
handler.register = true
export default handler