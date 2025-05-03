const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(401).send('Admin tapılmadı');

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).send('Şifrə yalnışdır');

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
};
