const axios = require('axios').default;
const noticiasGenerator = require('./noticiasGenerator');
const emailsGenerator = require('./emailsGenerator');

var noticias = noticiasGenerator();
var emails = emailsGenerator();

addNoticias(noticias, 0); // O segundo parâmetro deve ser 0
addEmails(emails, 0); // O segundo parâmetro deve ser 0

function addNoticias(noticias, i) {

    axios.post('http://localhost:3000/noticia', noticias[i]).then(res => {
        i++;
        if (i < noticias.length) addNoticias(noticias, i)
    });

}

function addEmails(emails, i) {
 
    axios.post('http://localhost:3000/inscricao', {email: emails[i]}).then(res => {
        
        i++;
        if (i < emails.length) addEmails(emails, i)
    });

}