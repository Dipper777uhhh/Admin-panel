const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Əvvəlcədən hash-lənmiş şifrə
const adminEmail = 'qalamqes@gmail.com';
const hashedPassword = '$2b$10$ZIH1gBbD8sUuY6Evsk3tX.8dvNcWtbWzVbD5vFi8Jx7uubByLJ.BS';

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== adminEmail) {
    return res.send('Email yalnışdır.');
  }

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) throw err;
    if (result) {
      res.redirect('/admin');
    } else {
      res.send('Şifrə yalnışdır.');
    }
  });
});

app.get('/admin', (req, res) => {
  res.send('Admin panelinə xoş gəldiniz!');
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} ünvanında işləyir`);
});
