const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render('auth/login', { error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, { httpOnly: true });
      res.redirect('/dashboard');
    } catch (error) {
      res.render('auth/login', { error: 'Login failed' });
    }
  }

  static async logout(req, res) {
    res.clearCookie('token');
    res.redirect('/auth/login');
  }

  static loginPage(req, res) {
    res.render('auth/login');
  }
}