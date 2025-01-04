import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'

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
    // Subir imagen a Free Image Host usando axios
    let response = await axios.post('https://www.freeimage.host/upload', formData, {
      headers: {
        ...formData.getHeaders()
      }
    })

    // Verificar el cuerpo de la respuesta
    console.log('Respuesta de Free Image Host:', response.data)

    // Verificar si la respuesta contiene HTML (en caso de error)
    if (response.data.includes('<!DOCTYPE html>')) {
      throw new Error('Error al procesar la imagen. La respuesta parece ser una página de error HTML.')
    }

    // Verificar si la respuesta de Free Image Host es válida
    if (!response.data || !response.data.url) {
      throw new Error('Error al obtener respuesta de Free Image Host')
    }

    await m.react('✅')

    let txt = '`F R E E  I M A G E  H O S T - U P L O A D E R`\n\n'

    // Información de Free Image Host
    txt += `*🔖 Titulo* : ${q.filename || 'x'}\n`
    txt += `*🔖 Enlace* : ${response.data.url}\n`
    txt += `*🔖 Delete* : ${response.data.delete_url}\n\n`
    txt += `© By: Genesis`

    // Enviar el archivo
    await conn.sendFile(m.chat, response.data.url, 'freeimage.jpg', txt, m, null, fake)

  } catch (error) {
    console.error('Error al procesar la imagen:', error)
    await m.reply('Hubo un error al subir la imagen. Revisa la consola para más detalles.')
    await m.react('❌')
  }
}

handler.tags = ['convertir']
handler.help = ['tofreeimage']
handler.command = /^(tourl3|tofreeimage)$/i
handler.register = true
export default handler