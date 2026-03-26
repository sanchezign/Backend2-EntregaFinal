// src/routes/sessionsRouter.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import userRepository from './UserRepository.js';
import { sendRecoveryEmail } from '../config/mailer.js';
import crypto from 'crypto';

const router = Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
    }

    const exists = await userRepository.getByEmail(email);
    if (exists) return res.status(400).json({ status: 'error', message: 'Email ya registrado' });

    const newUser = await userRepository.create({ first_name, last_name, email, age: Number(age), password, role: 'user' });

    res.status(201).json({ status: 'success', message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie('coderCookieToken', token, { httpOnly: true, maxAge: 24*60*60*1000 });
    res.json({ status: 'success', message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Current con DTO
router.get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
  const userDTO = await userRepository.getCurrentUser(req.user._id);
  res.json({ status: 'success', user: userDTO });
});

// Recuperación de contraseña
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
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;