function criarNoticia(titulo, resumo, url) {
    return {
        titulo: titulo,
        resumo: resumo,
        url: url
    }
}

const noticiasGenerator = () =>{
    var noticias = [];

    for (let i = 1; i <= 5; i++) { // Alimentando o array com 5 notícias aleatórias

        let noticia = criarNoticia("Notícia " + i, "Resumo " + i, "Url " + i);
    
        noticias.push(noticia);
    
    }

    return noticias;
}

module.exports = noticiasGenerator;