const nodemailer = require('nodemailer')

class MailService {
    async sendMessage({ from, to, subject, text }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })

        transporter.sendMail({ from, to, subject, text })
    }
}

module.exports = new MailService()