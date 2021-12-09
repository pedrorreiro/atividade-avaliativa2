const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sophie.dietrich65@ethereal.email',
        pass: 'FPRxQUTZKTrhHmshwW'
    }
});

async function sendEmail(noticia, email){
    try{
        const info = await transporter.sendMail({
            from: '"Sophie Dietrich" <sophie.dietrich65@ethereal.email>',
            to: email,
            subject: noticia.titulo,
            text: noticia.resumo
        })
        
        return true
    }catch(err) {
       return false
    }
}
module.exports = sendEmail;