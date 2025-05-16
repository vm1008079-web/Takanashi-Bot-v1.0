import ytdl from 'ytdl-core';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, command }) => {
  const url = args[0];
  if (!url || !url.includes('youtu')) throw `❗ Envía un enlace válido de YouTube. Ejemplo:\n.${command} https://youtu.be/TzboDb_uzsk`;

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const format = ytdl.chooseFormat(info.formats, { quality: '18' }); // MP4 360p

    if (!format || !format.url) throw '⚠️ No se pudo obtener el video. Intenta con otro link.';

    const videoResponse = await fetch(format.url);
    const buffer = await videoResponse.arrayBuffer();
    const videoSizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);

    if (videoSizeMB > 100) throw `❗ El video pesa ${videoSizeMB}MB y excede el límite de 100MB.`;

    await conn.sendMessage(m.chat, {
      document: Buffer.from(buffer),
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `🎬 *${title}*\n📦 Enviado como documento (.mp4)`,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al descargar el video. Puede que el video sea muy pesado o el enlace no sea válido.');
  }
};

handler.command = /^ytmp4doc$/i;
handler.help = ['ytmp4doc <link>'];
handler.tags = ['downloader'];
export default handler;