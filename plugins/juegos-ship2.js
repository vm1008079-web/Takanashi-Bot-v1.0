let handler = async (m) => {
  const preguntas = [
    {
      pregunta: "El Sol es una estrella. ¿Verdadero o Falso?",
      respuesta: "✅ Verdadero"
    },
    {
      pregunta: "Los gatos pueden volar. ¿Verdadero o Falso?",
      respuesta: "❌ Falso"
    },
    {
    
    pregunta: "🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 se enamora de akeno himejima-BOT. ¿Verdadero o Falso?",
      respuesta: "✅ Verdadero"
    },
    {
    
    pregunta: "los animales pueden hablar. ¿Verdadero o Falso?",
      respuesta: "❌ Falso"
    },
    {
    
   
      pregunta: "El océano Atlántico es más grande que el Pacífico. ¿Verdadero o Falso?",
      respuesta: "❌ Falso"
    },
    {
      pregunta: "2 + 2 es igual a 4. ¿Verdadero o Falso?",
      respuesta: "✅ Verdadero"
    },
    {
      pregunta: "La Tierra tiene dos lunas. ¿Verdadero o Falso?",
      respuesta: "❌ Falso"
    }
  ];

  const aleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];

  await m.reply(`❓ *Pregunta:*\n${aleatoria.pregunta}\n\n✅ *Respuesta correcta:* ${aleatoria.respuesta}`);
};

handler.help = ["vf"];
handler.tags = ["juegos"];
handler.command = ["vf"];
// handler.group = true; // Si esto existe, elimínalo para que funcione también en privados

export default handler;