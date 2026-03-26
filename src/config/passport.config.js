// src/config/passport.config.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userRepository from '../repositories/UserRepository.js';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET || 'unaClaveMuyLargaYSecreta123', // fallback por si no hay .env
};

// Estrategia JWT para ruta /current
passport.use(
    'current',
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            // Usamos el Repository en lugar del modelo directamente (más limpio y profesional)
            const user = await userRepository.getById(jwt_payload.id);

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            return done(null, user);
        } catch (error) {
            console.error('Error en estrategia JWT current:', error);
            return done(error, false);
        }
    })
);

// Serialización (opcional pero recomendado mantener)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userRepository.getById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;