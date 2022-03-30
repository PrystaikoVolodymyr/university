const nodemailer = require("nodemailer");

module.exports = {
    async sendMail(subject, text, recipient) {
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'prystaiko.univer@gmail.com',
                    pass: 'pss252322',
                },
            });

             await transporter.sendMail({
                from: "Volodymyr",
                to: recipient,
                subject: subject ,
                html: `<div style="text-align: center; font-size: 50px"><p>${text}</p></div>`
            });

        } catch (err) {
            throw err
        }
    }
}

