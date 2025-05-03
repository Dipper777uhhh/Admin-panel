const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'admin123') {
    res.redirect('/admin');
  } else {
    res.send('Şifrə və ya email yalnışdır.');
  }
});

app.get('/admin', (req, res) => {
  res.render('admin', { vipList: [], receipts: [] });
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} ünvanında işləyir`);
});
