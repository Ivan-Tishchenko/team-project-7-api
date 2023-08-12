"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "vati5@ukr.net",
    pass: "uGbhl98Yl3Et6tbQ",
  },
});

async function sendMail(email, verificationToken) {
  const info = await transporter.sendMail({
    from: `"node.js api " <vati5@ukr.net>`,
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">verify</a>`,
  });

  return info;
}

sendMail().catch(console.error);

module.exports = sendMail;
