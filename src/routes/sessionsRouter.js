import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import crypto from 'crypto';

import userRepository from '../repositories/UserRepository.js';
import { sendRecoveryEmail } from '../config/mailer.js';

const router = Router();

// ==================== REGISTRO ====================
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos obligatorios: first_name, last_name, email, age, password'
      });
    }

    const exists = await userRepository.getByEmail(email);
    if (exists) {
      return res.status(400).json({
        status: 'error',
        message: 'El email ya está registrado'
      });
    }

    const newUser = await userRepository.create({
      first_name,
      last_name,
      email,
      age: Number(age),
      password
    });

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente'
    });
  } catch (error) {
    console.error('[POST /register] Error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ==================== LOGIN ====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.getByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('coderCookieToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ status: 'success', message: 'Login exitoso' });
  } catch (error) {
    console.error('[POST /login] Error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ==================== CURRENT (DTO estricto) ====================
router.get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
  try {
    const userDTO = await userRepository.getCurrentUser(req.user._id);
    res.json({ status: 'success', user: userDTO });
  } catch (error) {
    console.error('[GET /current] Error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ==================== RECUPERACIÓN DE CONTRASEÑA ====================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userRepository.getByEmail(email);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendRecoveryEmail(email, token);
    res.json({ status: 'success', message: 'Correo de recuperación enviado' });
  } catch (error) {
    console.error('[POST /forgot-password] Error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Resetear contraseña
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ status: 'error', message: 'Nueva contraseña es requerida' });
    }

    const user = await userRepository.getByEmailForReset(token);
    if (!user || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ status: 'error', message: 'Token inválido o expirado' });
    }

    // Evitar reutilizar la misma contraseña
    if (bcrypt.compareSync(newPassword, user.password)) {
      return res.status(400).json({
        status: 'error',
        message: 'No puedes usar la misma contraseña anterior'
      });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('[POST /reset-password] Error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
