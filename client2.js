const axios = require('axios').default;
const sendEmail = require('./sendEmail');

axios.get('http://localhost:3000/noticia').then(res => {

    const noticias = res.data;

    noticias.forEach(noticia => {
        console.log("ID: " + noticia.id);
        console.log("Título: " + noticia.titulo);
        console.log("Resumo: " + noticia.resumo);
        console.log("Url: " + noticia.url);
        console.log("\n");
    })

    const noticia = noticias[noticias.length-1]; 
    // Escolhi a última notícia. 
    //Foi pedido na avaliação que escolhesse uma das notícias para disparar os e-mails

    axios.put('http://localhost:3000/enviar/' + noticia.id).then(res =>{
        console.log("Notícia de ID " + noticia.id + " enviada!");
    })
});