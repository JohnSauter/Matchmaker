require('dotenv').config();
const nodemailer = require('nodemailer');
const { User } = require('../models');

let email_host = process.env.EMAIL_HOST;
let email_port = process.env.EMAIL_PORT;
let email_secure = process.env.EMAIL_SECURE;
let email_user = process.env.EMAIL_USER;
let email_password = process.env.EMAIL_PASSWORD; { }
let email_sender = process.env.EMAIL_DISPLAY_NAME;


async function match_email(seeker, choice) {
    let recipient = seeker.email;
    let subject = 'Congratulations on choosing your match!';
    let text = 'Their name is ${choice.username}. Their contact information is: ${choice.contactInfo}. Good Luck!'
    await sendEmail(recipient, subject, text);

    recipient = choice.email;
    subject = 'Congratulations! You have been matched!';
    text = 'Their name is ${seeker.username}. Their contact information is: ${seeker.contactInfo}. Good Luck!'
    await sendEmail(recipient, subject, text);

}

async function reject_email(seeker, choice) {
    let recipient = seeker.email;
    let subject = 'So sorry it did not work out.';
    let text = 'Your rejection of your match with ${choice.username} has been recorded. Better luck next time.'
    await sendEmail(recipient, subject, text);

    recipient = choice.email;
    subject = 'You have been unmatched.';
    text = 'At their request, you have been unmatched from ${seeker.username}. Please log in to try again. We wish you luck!'
    await sendEmail(recipient, subject, text);
}

async function sendEmail(recipient, subject, text) {
    try {
        /* If any of the email information is missing,
         * use the ethereal test site.  */
        let transporter = null;
        let email_to_test_account = false;
        if (
            !email_host ||
            !email_port ||
            !email_secure ||
            !email_user ||
            !email_password
        ) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            email_to_test_account = true;
            const testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });
        } else {
            transporter = nodemailer.createTransport({
                host: email_host,
                port: Number(email_port),
                secure: JSON.parse(email_secure),
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: email_user,
                    pass: email_password,
                },
            });
        };
        const info = await transporter.sendMail({
            from: email_sender,
            to: recipient,
            subject: subject,
            text: text,
        });


        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        console.log(info);
        // Preview only available when sending through an Ethereal account
        if (email_to_test_account) {
            console.log(nodemailer.getTestMessageUrl(info))
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        } else {
            console.log("message sent");
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = { match_email, reject_email };
