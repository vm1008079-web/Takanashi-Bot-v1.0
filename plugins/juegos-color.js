let handler = async (m, { conn }) => {
  const colores = ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Negro', 'Blanco'];
  let elegido = colores[Math.floor(Math.random() * colores.length)];
  await conn.sendMessage(m.chat, {
    text: `🎨 *Color elegido:* ${elegido}`,
    contextInfo: {
      externalAdReply: {
        title: "Color Aleatorio",
        body: "¿Adivinaste el color?",
        sourceUrl: "https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A", // Aquí pon tu canal o grupo
        thumbnailUrl: "https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        externalAdReply: {
          title: "TOCA AQUI", // <- Aquí está el cambio
          body: "",
          sourceUrl: "https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A",
          thumbnailUrl: "https://qu.ax/AAcAd.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }
  });
};

handler.command = ['color'];
handler.tags = ['juegos'];
handler.help = ['color'];
export default handler;