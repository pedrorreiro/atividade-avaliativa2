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

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
})