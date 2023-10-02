const nodemailer = require('nodemailer');

async function sendMail(email, subject, message) {
  if (!message) {
    throw new Error('Mail content cannot be empty!');
  }

  if (!email) {
    throw new Error('Email cannot be empty!');
  }
  if (!subject) {
    throw new Error('Subject cannot be empty!');
  }

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_APP_USER,
      pass: process.env.GOOGLE_APP_PW,
    },
  });

  // Send email using the transporter
  const response = await transporter.sendMail({
    from: `Form Message Collector <${process.env.MAIL_USER}>`,
    to: email,
    subject: subject,
    html: message,
  });

  console.log(response);

  //   if (error) throw new Error(error);

  //   console.log('Email sent: ' + info.response);
}

module.exports = {
  sendMail,
};
