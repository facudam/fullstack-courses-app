import nodemailer from 'nodemailer';
import { NODEMAILER_EMAIL, NODEMAILER_EMAILPASS, NODEMAILER_HOST, URL_BACKEND } from '../../config';

interface Data {
    name: string,
    email: string,
    token: string
}
export const sendEmail = async(data: Data) => {

    const { name, email, token } = data;

    const transporter = nodemailer.createTransport({
        host: NODEMAILER_HOST,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_EMAILPASS,
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      await transporter.sendMail({
        from: NODEMAILER_EMAIL,
        to: email,
        subject: "Confirma tu cuenta en CoursesLibra",
        text: "Confirma tu cuenta en CoursesLibra",
        html: `
            <p>¡Hola ${name}! Te damos la bienvenida a CoursesLibra, para poder utilizar tu cuenta te pedimos que confirmes tu email haciendo clic en el siguiente enlace: <a href="${URL_BACKEND}/api/confirmar/${token}">confirmar mi cuenta</a></p>
            <p>Si no has creado una cuenta en la plataforma ignora este mensaje.</p>
            <p>¡Saludos amigo/a!</p>
        `
      })
}