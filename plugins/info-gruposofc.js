let handler = async (m, { conn, usedPrefix, command }) => {
  let grupos = `*¡Hola! Te invito a unirte a los grupos oficiales del bot para convivir con la comunidad...*

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 1. Grupo Oficial 』*
   ├─ ❏ 💥 https://chat.whatsapp.com/DzKo6dRhVXNHLwUBkMnz04
   ╰─━━────────────━━─╯

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 Canal Oficial 』*
   ├─ ❏  https://github.com/M3rcenario28/Takanashi-Bot-v1.0
   ╰─━━────────────━━─╯`

  const catalogo1 = 'https://qu.ax/QmXxc.jpg'

  await conn.sendFile(m.chat, catalogo1, 'Kanashi-Bot.jpg', grupos, m, rcanal)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler