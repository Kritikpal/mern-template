import { SMTP_USER, transporter } from "../config/mailConfig.js";

export const sendEmail = async (subject, content, to) => {
  const info = await transporter.sendMail({
    from: SMTP_USER,
    to: to,
    subject: subject,
    html: content,
  });
  return info;
};
