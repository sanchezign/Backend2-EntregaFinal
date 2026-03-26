# Backend II - Entrega Final  
**Programación Backend I - Desarrollo Avanzado**

Entrega final del curso Backend II (Coderhouse).  
Arquitectura profesional con **Patrón Repository + DAO**, **DTO**, **Middleware de Autorización**, **Recuperación de contraseña por email** y **Lógica de compra con Ticket**.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-orange)

## Objetivos cumplidos ✓

- Patrón Repository + DAO implementado correctamente
- DTO para ruta `/current` (sin datos sensibles)
- Sistema completo de recuperación de contraseña (email + token de 1 hora + no repetir contraseña anterior)
- Middleware de autorización por roles (`admin` y `user`)
- Solo admin puede crear/actualizar/eliminar productos
- Solo usuarios logueados pueden agregar productos al carrito
- Modelo Ticket + lógica de compra robusta
- Arquitectura profesional y escalable

## Tecnologías y patrones

- Repository Pattern + DAO
- DTO (Data Transfer Object)
- Middleware de autorización
- Nodemailer (recuperación de contraseña)
- JWT + Passport + cookie httpOnly
- Mongoose + populate + lean

## Instalación

1. Clonar repositorio
   ```bash
   git clone https://github.com/sanchezign/Backend2-EntregaFinal.git
   cd Backend2-EntregaFinal
    
2. Instalar dependencias
   npm install
  
3. Crear .env

.env.example (crea este archivo)

PORT=8080
MONGO_URL=mongodb+srv://...
JWT_SECRET=superSecretKey2026CambialaEnProduccion!
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_app_google

4. Iniciar servidor
   npm start




Endpoints principales

Método,Ruta,Descripción,Autorización
POST,/api/sessions/register,Registro de usuario,Pública
POST,/api/sessions/login,Login + JWT en cookie,Pública
GET,/api/sessions/current,Datos del usuario (DTO seguro),JWT
POST,/api/sessions/forgot-password,Envía email de recuperación,Pública
POST,/api/products,Crear producto,Admin
PUT,/api/products/:pid,Actualizar producto,Admin
DELETE,/api/products/:pid,Eliminar producto,Admin
POST,/api/carts/:cid/product/:pid,Agregar producto al carrito,User


Variables de entorno (.env)

PORT=8080
MONGO_URL=tu_string_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_muy_larga
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_app_google



