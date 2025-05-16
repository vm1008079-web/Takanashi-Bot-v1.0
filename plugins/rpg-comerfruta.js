let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const frutas = [
    'Gomu Gomu no Mi',
    'Mera Mera no Mi',
    'Suna Suna no Mi',
    'Ope Ope no Mi',
    'Yami Yami no Mi'
  ]
  const fruta = frutas[Math.floor(Math.random() * frutas.length)]
  user.fruta = fruta
  await m.reply(`🍇 Has comido la *${fruta}*. ¡Ahora tienes poderes increíbles!`)
}

handler.help = ['comerfruta']
handler.tags = ['rpg']
handler.command = ['comerfruta']
handler.group = true
handler.register = true

export default handler