import nodemailer from 'nodemailer';

interface ISendEmail {
  email: string;
  subject: string;
  message: string;
}

export const emailAdapter = {
  async sendEmail({ email, subject, message }: ISendEmail) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      //service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: message,
    });

    return info;
  },
};
