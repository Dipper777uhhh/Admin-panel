const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie-ləri oxumaq üçün

const SECRET_KEY = 'your_secret_key'; // Bu kodu .env faylında saxla

// Adminin şifrəsini daha təhlükəsiz etmək üçün
const adminEmail = 'admin@example.com';
const adminPassword = '$2b$10$8uO7XzFdo3el7EZGh0lReu8GmIMwSbqzp8Lymbx0aH0W.bW7kCeqG'; // Şifrə hash-lanıb

// Login səhifəsi
app.get('/login', (req, res) => {
  res.render('login');
});

// Login əməliyyatı
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === adminEmail && await bcrypt.compare(password, adminPassword)) {
    const token = jwt.sign({ email: adminEmail }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin');
  } else {
    res.send('Şifrə və ya email yalnışdır.');
  }
});

// Admin səhifəsi
app.get('/admin', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login'); // Token yoxdursa login səhifəsinə yönləndiririk

  try {
    jwt.verify(token, SECRET_KEY); // Tokeni doğrulamaq
    res.render('admin', { vipList: [], receipts: [] }); // Admin səhifəsini göstəririk
  } catch (err) {
    res.redirect('/login'); // Etibarsız token varsa login səhifəsinə yönləndiririk
  }
});

// Serveri başlatmaq
app.listen(port, () => {
  console.log(`Server http://localhost:${port} ünvanında işləyir`);
});
