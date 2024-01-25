// netlify-functions/sendEmail.js
const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    try {
        const { name, email, phone, message } = JSON.parse(event.body);

        // Configure nodemailer to send emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        transporter.verify((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Ready to Send");
            }
        });
        // Email content
        const mail = {
            from: name,
            to: "arashesfandiari@yahoo.com",
            subject: "Contact Form Submission - Portfolio",
            html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`,
        };

        // Send the email
        await transporter.sendMail(mail);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
