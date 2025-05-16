let handler = async (m, { conn }) => {
  const info = `
╭─❒ 「 *INFO DEL BOT* 」
│ 🤖 *Nombre:* 𝓜𝓸𝓷𝓴𝓮𝔂-𝓓-𝓛𝓾𝓯𝓯𝔂-AI
│ 👑 *Creador:* @🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲.OFICIAL 
│ 🧠 *Base:* 𝓜𝓸𝓷𝓴𝓮𝔂-𝓓-𝓛𝓾𝓯𝓯𝔂 𝓑𝓸𝓽-MD
│ 🌐 *Plataforma:* Baileys MD
│ 📆 *Fecha:* ${new Date().toLocaleDateString()}
╰───────────────`;

  await conn.sendMessage(m.chat, {
    text: info,
    contextInfo: {
      externalAdReply: {
        title: "Información del Bot",
        body: "Bot desarrollado con amor",
        sourceUrl: "https://github.com/TOKIO5025",
        thumbnailUrl: "https://qu.ax/znlhs.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  });
};

handler.command = ['infobot'];
handler.tags = ['main'];
handler.help = ['infobot'];
export default handler;