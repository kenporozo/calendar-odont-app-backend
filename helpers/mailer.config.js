const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USER, // generated ethereal user
    pass: process.env.OUTLOOK_PASSWORD, // generated ethereal password
  },
});

transporter.verify().then(() => {
    console.log("Email ok")
});

module.exports = {
    transporter
}
