import fetch from 'node-fetch';
import yts from "yt-search";
import axios from 'axios';
import { default as baileys } from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;
import FormData from "form-data";
import fs from "fs";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`💜 *Ejemplo:* ${usedPrefix + command} Bad bunny`);

  await m.react('🕓');

  async function createImage(img) {
    const { imageMessage } = await generateWAMessageContent({ image: img }, {
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
    let imageK = await fetch(video.thumbnail);
    let imageB = await imageK.buffer();
    let pr;
    try {
      pr = await remini(imageB, "enhance");
    } catch (e) {
      pr = imageB; // Si falla remini, usa imagen original
    }

    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `◦ *Título:* ${video.title}\n◦ *Duración:* ${video.timestamp}\n◦ *Vistas:* ${video.views}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: await createImage(pr)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Descargar audio 💜",
              copy_code: `.ytmp3 ${video.url}`
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Descargar video 🍜",
              copy_code: `.ytmp4 ${video.url}`
            })
          }
        ]
      })
    });
  }

  const content = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: { text: '*🍓 Resultados de:* ' + `*${text}*` },
          footer: { text: 'Desliza los resultados y toca el botón para copiar el comando. Solo envíalo y listo!' },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards: push }
        })
      }
    }
  }, { quoted: m });

  await conn.relayMessage(m.chat, content.message, { messageId: content.key.id });
  await m.react('✅');
};

handler.help = ["ytsearch", "yts"];
handler.tags = ["search"];
handler.command = ["ytsearch", "yts"];
export default handler;

// Función para mejorar la imagen
async function remini(imageData, operation) {
  return new Promise((resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (!availableOperations.includes(operation)) operation = "enhance";
    const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg"
    });
    formData.append("model_version", 1);

    formData.submit({
      url: baseUrl,
      host: "inferenceengine.vyro.ai",
      path: `/${operation}`,
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip"
      }
    }, function (err, res) {
      if (err) return reject(err);
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", err => reject(err));
    });
  });
}