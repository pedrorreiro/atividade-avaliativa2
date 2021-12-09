const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'blanche.farrell98@ethereal.email',
        pass: '6v1VcBNyauBpmRV5mw'
    }
});

async function sendEmail(noticia, email){
    try{
        const info = await transporter.sendMail({
            from: '"Blanche Farrell" <blanche.farrell98@ethereal.email>',
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