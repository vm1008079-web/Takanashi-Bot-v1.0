let handler = async (m, { conn }) => {
  const misiones = [
    'Captura a un pirata con 10M de recompensa.',
    'Protege la aldea de Orange Town.',
    'Investiga un barco fantasma.',
    'Explora una isla volcánica.',
    'Busca una Fruta del Diablo en el mercado negro.'
  ]
  const mision = misiones[Math.floor(Math.random() * misiones.length)]
  await m.reply(`📜 Misión asignada:\n${mision}`)
}

handler.help = ['mision']
handler.tags = ['rpg']
handler.command = ['mision']
handler.group = true
handler.register = true

export default handler