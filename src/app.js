import 'dotenv/config';
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { __dirname } from './utils.js';
import connectToDB from './config/db.config.js';

// Importación de routers (nueva estructura profesional)
import viewsRouter from './routes/viewsRouter.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import sessionsRouter from './repositories/sessionsRouter.js';
import usersRouter from './routes/usersRouter.js';   // ← Nuevo

import './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

// ==================== MIDDLEWARES ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(passport.initialize());

// ==================== CONFIGURACIÓN DE VISTAS ====================
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// ==================== RUTAS ====================

// Rutas de vistas (públicas - Handlebars)
app.use('/', viewsRouter);

// Rutas de API
app.use('/api/sessions', sessionsRouter);   // Registro, login, current, forgot-password
app.use('/api/users', usersRouter);         // Gestión de usuarios (admin)
app.use('/api/products', productsRouter);   // Productos (CRUD + listado público)
app.use('/api/carts', cartsRouter);         // Carritos

// ==================== CONEXIÓN A BASE DE DATOS ====================
connectToDB();

// ==================== SERVIDOR ====================
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// ==================== SOCKET.IO ====================
const io = new Server(httpServer);
app.set('socketio', io);

export default app;