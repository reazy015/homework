import nodemailer from "nodemailer";
import {config} from 'dotenv'

config()
export const emailAdapter = {
    async sendEmail(email: string, /*subject: string, message: string*/confirmationCode: string) {

        const subject = '<h1>Thank for your registration</h1>'
        const message = `<p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
        </p>`

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        async function main() {
            const info = await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: email, // list of receivers
                subject: subject, // Subject line
                html: message, // html body
            });
            console.log(info)
            console.log("Message sent: %s", info.messageId);
            return info
        }

        main().catch(console.error);
    }
}