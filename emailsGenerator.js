const emailsGenerator = () =>{
    var emails = [];

    for (let i = 1; i <= 7; i++) { // Alimentando o array com 5 emails aleatórios

        let email = "email" + i + "@gmail.com";
    
        emails.push(email);
    
    }

    return emails;
}

module.exports = emailsGenerator;