import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendReminderEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Task Manager" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Reminder sent to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};
