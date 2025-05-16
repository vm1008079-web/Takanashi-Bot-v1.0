let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const enemigos = ['Marine', 'Pirata del Este Azul', 'Bestia Marina']
  const enemigo = enemigos[Math.floor(Math.random() * enemigos.length)]
  const daño = Math.floor(Math.random() * 100)
  const recompensa = daño > 40 ? 150 : 50

  let mensaje = `⚔️ Te enfrentaste a un *${enemigo}*\n`
  mensaje += `Causaste ${daño} de daño.\n`
  mensaje += daño > 40 ? `¡Victoria! Ganaste ${recompensa} berries.` : `Te retiraste con vida. Recibes ${recompensa} berries.`
  
  user.coin += recompensa
  await m.reply(mensaje)
}

handler.help = ['combatir']
handler.tags = ['rpg']
handler.command = ['combatir']
handler.group = true
handler.register = true

export default handler