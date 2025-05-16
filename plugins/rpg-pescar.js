let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const resultados = [
    { nombre: 'un Rey Marino', valor: 300 },
    { nombre: 'una langosta azul', valor: 150 },
    { nombre: 'una bota vieja', valor: 0 },
    { nombre: 'un pez dorado', valor: 500 },
    { nombre: 'una piedra brillante', valor: 100 }
  ]

  const pesca = resultados[Math.floor(Math.random() * resultados.length)]
  user.coin += pesca.valor

  await m.reply(`🎣 Pescaste *${pesca.nombre}*.\n${pesca.valor > 0 ? `¡Ganaste ${pesca.valor} berries!` : 'No valía nada...'}`)
}

handler.help = ['pescar']
handler.tags = ['rpg']
handler.command = ['pescar']
handler.group = true
handler.register = true

export default handler