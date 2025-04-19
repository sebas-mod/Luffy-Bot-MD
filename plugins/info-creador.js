let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝐒𝐞𝐛𝐚𝐬-𝐌𝐃;;\nFN:𝐒𝐞𝐛𝐚𝐬-𝐌𝐃\nORG:𝐒𝐞𝐛𝐚𝐬-𝐌𝐃\nTITLE:\nitem1.TEL;waid=5491166887146:5491166887146\nitem1.X-ABLabel:𝐒𝐞𝐛𝐚𝐬-𝐌𝐃\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝐒𝐞𝐛𝐚𝐬-𝐌𝐃\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '𝐒𝐞𝐛𝐚𝐬-𝐌𝐃', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler