const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maxwell.roob56@ethereal.email',
        pass: 'UnK4Xph8E9BPNsYXvk'
    }
});

async function sendEmail(noticia, email){
    try{
        const info = await transporter.sendMail({
            from: '"Maxwell Roob" <maxwell.roob56@ethereal.email>',
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