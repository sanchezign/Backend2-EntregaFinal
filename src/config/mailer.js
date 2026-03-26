import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendRecoveryEmail = async (email, token) => {
  const resetUrl = `http://localhost:8080/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Ecommerce" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>El enlace expira en 1 hora:</p>
      <a href="${resetUrl}" style="background:#3498db;color:white;padding:12px 20px;border-radius:5px;text-decoration:none;">Restablecer contraseña</a>
      <p>Si no lo solicitaste, ignora este correo.</p>
    `
  });
};