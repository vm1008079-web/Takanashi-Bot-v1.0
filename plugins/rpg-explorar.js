let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const eventos = [
    'Encontraste 200 berries en un cofre viejo.',
    'Una banda pirata te robó 100 berries.',
    'Nada interesante... solo cocos y gaviotas.',
    '¡Hallaste una pista sobre un tesoro oculto!',
    'Un animal salvaje te atacó. Pierdes 50 berries.'
  ]
  const resultado = eventos[Math.floor(Math.random() * eventos.length)]

  if (resultado.includes('encontraste')) user.coin += 200
  if (resultado.includes('robó')) user.coin -= 100
  if (resultado.includes('atacó')) user.coin -= 50

  await m.reply(`🌴 | ${resultado}`)
}

handler.help = ['explorar']
handler.tags = ['rpg']
handler.command = ['explorar']
handler.group = true
handler.register = true

export default handler