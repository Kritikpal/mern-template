import nodemailer from "nodemailer";

const SMTP_HOST  = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = process.env.SMTP_PORT || 587;
export const SMTP_USER = process.env.SMTP_USER || "kritikpal123@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "bjxx kklc ijrn xnkb";

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
