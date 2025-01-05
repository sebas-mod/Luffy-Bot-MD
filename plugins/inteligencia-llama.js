import Groq from 'groq-sdk'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let groq = new Groq({ apiKey: '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' })
  conn.aiSessions = conn.aiSessions ? conn.aiSessions : {}

  if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para hablar con la IA`, m)

  try {
    let { key } = await conn.sendMessage(m.chat, { text: '_❀ cargando respuesta_' }, { quoted: m })
    if (!(m.sender in conn.aiSessions))
      conn.aiSessions[m.sender] = [{
        role: 'system',
        content: `Eres Llama AI una inteligencia artificial, responde de manera clara y concisa para que los usuarios entiendan mejor tus respuestas. El nombre del usuario será: ${conn.getName(m.sender)}`
      }]

    if (conn.aiSessions[m.sender].length > 10) {
      conn.aiSessions[m.sender] = conn.aiSessions[m.sender].slice(-1)
    }

    conn.aiSessions[m.sender].push({ role: 'user', content: text })

    let sessionMessages = [...conn.aiSessions[m.sender], { role: 'user', content: text }]

    let payloads = { messages: sessionMessages, model: 'llama-3.1-70b-versatile' }

    let json = await groq.chat.completions.create(payloads)
    let responseMessage = json.choices[0].message.content
    conn.aiSessions[m.sender].push({ role: "system", content: responseMessage })

    await conn.sendMessage(m.chat, { text: responseMessage, edit: key }, { quoted: m })

  } catch (error) {
    console.error(error)
  }
}

handler.command = ['llamaAi']

export default handler