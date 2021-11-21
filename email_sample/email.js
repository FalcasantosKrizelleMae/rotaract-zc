const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      ssl: 465, // true for 465, false for other ports
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: 'Rotaraty Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
      to: 'casaleangeliquerose22@gmail.com', // list of receivers
      subject: 'SAMPLE EMAIL', // Subject line
      text: 'hi this is a sample email', // plain text body
      html: '<b>Hi! Welcome to Rotary Zamboanga.</b>',
      auth: {
         user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
         pass: 'rotaractzc', // generated ethereal password
      },
   });

   console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);
