const express = require('express');
const bodyParser = require('body-parser');
const storage = require('node-persist');

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
    //console.log(noticias);

    if(noticias === undefined) res.send({error: "Lista de notícias vazia!"});

    else{
        let noticia = noticias.find(noticia => noticia.id === id);
  
        res.send(noticia);
    }
   
});

app.post('/inscricao', async (req, res) => {

    var emails;

    await storage.init();

    emails = await storage.getItem("emails");

    if(emails === undefined){
        storage.setItem('emails', []);
    }

    emails = await storage.getItem("emails");

    const email = req.body.email;

    emails.push(email);

   await storage.updateItem('emails', emails);

    res.send("Inscrição com sucesso!");

});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
})