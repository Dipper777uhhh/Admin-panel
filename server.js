const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Admin məlumatları
const adminEmail = 'qalamqes@gmail.com';
const hashedPassword = '$2a$10$FmjSYElx1ytdH6FeIzrAzO2STNQ3MAYYFbzzsHnkUq4nIA81Ko2cW'; // hash-lənmiş "1234qalaw"

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Ana səhifə yönləndirmə
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Login səhifəsi
app.get('/login', (req, res) => {
  res.render('login'); // login.ejs faylı olmalıdır
});

// Login POST
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== adminEmail) {
    return res.send('Email yalnışdır.');
  }

  bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) return res.send('Xəta baş verdi.');
    if (isMatch) {
      res.redirect('/admin');
    } else {
      res.send('Şifrə yalnışdır.');
    }
  });
});

// Admin panel
app.get('/admin', (req, res) => {
  res.send('Admin panelinə xoş gəldiniz!');
});

// Serveri işə sal
app.listen(port, () => {
  console.log(`Server http://localhost:${port} ünvanında işləyir`);
});
