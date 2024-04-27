// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // nodemailer eklendi

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/data', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Verileri e-posta olarak gönder
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-mail@gmail.com', // Gönderici e-posta adresi
      pass: 'mail app password' // Gönderici e-posta şifresi
    }
  });

  const mailOptions = {
    from: 'your-password@gmail.com',
    to: 'taker-mail', // Alıcı e-posta adresi
    subject: `${firstName}`,
    text: `
      İsmi Soyismi: ${firstName}
      Tlf No: ${lastName}
      Okul No: ${email}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Data received and email sent successfully' });
    }
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
