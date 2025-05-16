let handler = async (m, { conn }) => {
  const recompensas = [
    '5,000,000 berries',
    '15,000,000 berries',
    '50,000,000 berries',
    '120,000,000 berries'
  ]
  const recompensa = recompensas[Math.floor(Math.random() * recompensas.length)]
  const nombre = await conn.getName(m.sender)
  await conn.sendMessage(m.chat, {
    image: { url: 'https://i.imgur.com/2j9lFfl.jpg' },
    caption: `🪙 *CARTEL DE BUSCADO*\n\nNombre: *${nombre}*\nRecompensa: *${recompensa}*`
  }, { quoted: m })
}

handler.help = ['recompensa']
handler.tags = ['rpg']
handler.command = ['recompensa']
handler.group = true
handler.register = true

export default handler