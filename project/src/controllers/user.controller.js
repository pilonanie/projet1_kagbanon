const User = require('../models/user.model');

class UserController {
  static async dashboard(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.render('dashboard', { user });
    } catch (error) {
      res.render('error', { message: 'Error loading dashboard' });
    }
  }

  static async adminDashboard(req, res) {
    try {
      const users = await User.getAllUsers();
      res.render('admin/dashboard', { users });
    } catch (error) {
      res.render('error', { message: 'Error loading admin dashboard' });
    }
  }

  static async createUser(req, res) {
    try {
      await User.create(req.body);
      res.redirect('/admin/dashboard');
    } catch (error) {
      res.render('error', { message: 'Error creating user' });
    }
  }

  static async updateUser(req, res) {
    try {
      const success = await User.update(req.params.id, req.body);
      if (success) {
        res.redirect(req.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      } else {
        res.render('error', { message: 'User not found' });
      }
    } catch (error) {
      res.render('error', { message: 'Error updating user' });
    }
  }

  static async deleteUser(req, res) {
    try {
      await User.delete(req.params.id);
      res.redirect('/admin/dashboard');
    } catch (error) {
      res.render('error', { message: 'Error deleting user' });
    }
  }
}