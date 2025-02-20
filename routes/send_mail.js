const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "harshadakedare81@gmail.com",
    pass: "vsls yybg mbjy uzqz",
  },
});

// async..await is not allowed in global scope, must use a wrapper
  async function main(html_code) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'harshadakedare81@gmail.com', // sender address
    to: 'harshadakedare81@gmail.com', // list of receivers
    subject: "New Enquiry Alert", // Subject line
    text: "Hello world?", // plain text body
    html: html_code, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports=main;
