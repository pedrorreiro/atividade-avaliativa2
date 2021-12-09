const express = require('express');
const bodyParser = require('body-parser');
const storage = require('node-persist');
const sendEmail = require('./sendEmail');
const axios = require('axios').default;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/noticia', async (req, res) => {

    var noticias;

    await storage.init();

    noticias = await storage.getItem("noticias");

    if(noticias === undefined){
        await storage.setItem('noticias', []);
        noticias = await storage.getItem("noticias");
    }
    
    var id = 0;

    if (noticias.length) {
        id = noticias[(noticias.length) - 1].id;
        id++;
    }

    noticias.push({
        id: id,
        titulo: req.body.titulo,
        resumo: req.body.resumo,
        url: req.body.url
    });

    await storage.updateItem('noticias', noticias);

    res.send("Sucesso!");

});

app.get('/noticia', async (req, res) => {

    await storage.init();

    const noticias = await storage.getItem("noticias");
    res.send(noticias);

});

app.get('/noticia/:id', async(req, res) => {

    var id = parseInt(req.params.id);

    await storage.init();

    const noticias = await storage.getItem("noticias");

    if(noticias === undefined) {
        res.status(400).send("Lista de notícias vazia!");
    }

    else{
        let noticia = noticias.find(noticia => noticia.id === id);
        if(noticia === undefined) res.status(400).send("A notícia não existe!");
  
        res.send(noticia);
    }
   
});

app.post('/inscricao', async (req, res) => {

    var emails;

    await storage.init();

    emails = await storage.getItem("emails");

    if(emails === undefined){
        await storage.setItem('emails', []);
        emails = await storage.getItem("emails");
    }

    emails = await storage.getItem("emails");

    const email = req.body.email;

    emails.push(email);

   await storage.updateItem('emails', emails);

    res.send("Inscrição com sucesso!");

});

app.put('/enviar/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    await storage.init();

    const emails = await storage.getItem("emails");

    if(emails === undefined) res.status(400).send("Não há e-mails cadastrados!")

    axios.get('http://localhost:3000/noticia/' + id).then(resposta => {
        
        const noticia = resposta.data;

        let count = 0;

        var intervalo = setInterval(() =>{
            sendEmail(noticia, emails[count]);
            console.log("(Wait) Sending to " + emails[count] + "...");
            count++;
            if(count === emails.length){
                clearInterval(intervalo);
                console.log("\nDone!\n");

                res.send(emails);
            }
        }, 2000)

    }).catch(err => {
        res.status(400).send("A notícia não existe!");
    })

})

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
})