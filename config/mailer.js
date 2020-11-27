const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "09b4369736efa8",
        pass: "b715c552def959"
    }
});

module.exports = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

