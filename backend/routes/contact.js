const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY },
  });

  const mailOptions = {
    from: process.env.YOUR_EMAIL,
    to: process.env.YOUR_EMAIL,
    replyTo: email,
    subject: `New Message from Portfolio - ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send('Error sending message.');
    res.status(200).send('Message sent successfully!');
  });
});

module.exports = router;