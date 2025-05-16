import fetch from 'node-fetch';
import yts from "yt-search";
import FormData from "form-data";
import { fileTypeFromBuffer } from 'file-type';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*\`• Ejemplo: ${usedPrefix + command} Bad Bunny\`*`);

  await m.react('🕒');

  async function createImage(img) {
    const { imageMessage } = await generateWAMessageContent({
      image: img
    }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let results = await yts(text);
  let videos = results.videos.slice(0, 6);
  shuffleArray(videos);

  for (let video of videos) {
    try {
      let imageK = await fetch(video.thumbnail);
      let imageB = await imageK.buffer();
      let pr = await remini(imageB, "enhance");

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `\n> 🔥 *\`Título :\`* ${video.title}\n> 🔥 *\`Duración :\`* ${video.timestamp}\n> 🔥 *\`Vistas :\`* ${video.views}\n> 🔥 *\`Link :\`* ${video.url}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'N I N O  - N A K A N O - B O T'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `\`[ YOUTUBE - SEARCH ]\``,
          hasMediaAttachment: true,
          imageMessage: await createImage(pr)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: `{"display_text":"Mirar en YouTube","url":"${video.url}"}`
          }]
        })
      });
    } catch (e) {
      console.log(`Error con el video: ${video.title}`, e);
    }
  }

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: { text: "*`\Resultados De Tu Búsqueda\`*" },
          footer: { text: '_\`ʏ\` \`ᴛ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`ᴄ\` \`ʜ\`_' },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards: push }
        })
      }
    }
  }, {});

  await m.react('✅');
  await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
};

handler.help = ["ytsearch2 <texto>"];
handler.tags = ["buscador"];
handler.command = /^(ytsearch2|yts2)$/i;

export default handler;

async function remini(imageData, operation) {
  return new Promise((resolve, reject) => {
    const ops = ["enhance", "recolor", "dehaze"];
    if (!ops.includes(operation)) operation = ops[0];

    const formData = new FormData();
    formData.append("image", imageData, { filename: "image.jpg", contentType: "image/jpeg" });
    formData.append("model_version", 1);

    formData.submit({
      host: "inferenceengine.vyro.ai",
      path: `/${operation}`,
      protocol: "https:",
      headers: { "User-Agent": "okhttp/4.9.3" }
    }, (err, res) => {
      if (err) return reject(err);
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
  });
}