let handler = async (m, { conn }) => {
  if (!m.mentionedJid[0]) return m.reply('Menciona a alguien para reclutarlo.')
  let nombre = await conn.getName(m.mentionedJid[0])
  await conn.reply(m.chat, `⛵ Has reclutado a *${nombre}* para tu tripulación.`, m)
}

handler.help = ['reclutar @usuario']
handler.tags = ['rpg']
handler.command = ['reclutar']
handler.group = true
handler.register = true

export default handler