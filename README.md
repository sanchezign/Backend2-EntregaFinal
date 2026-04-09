# Backend II - Entrega Final

Implementación completa de una **API REST para e-commerce** con arquitectura profesional, patrones de diseño y seguridad avanzada.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-orange)
---

## Descripción del Proyecto

Este proyecto es una API backend completa para un e-commerce que incluye gestión de usuarios, productos, carritos y finalización de compras. Se destaca por su **arquitectura limpia y escalable** utilizando los patrones **Repository + DAO**, **DTO** y middlewares de autorización por roles.

### Objetivos Cumplidos ✓

- Patrón **Repository + DAO** implementado correctamente
- Uso de **DTO** en la ruta `/current` (sin exponer información sensible)
- Sistema completo de **recuperación de contraseña** por email (token de 1 hora + validación de no repetir contraseña anterior)
- Middleware de autorización por roles (`admin` y `user`)
- Solo **admin** puede crear, actualizar y eliminar productos
- Solo usuarios logueados pueden agregar productos al carrito
- Modelo `Ticket` con lógica robusta de finalización de compra
- Paginación profesional en productos con Handlebars
- Vistas funcionales y responsivas
---

## Tecnologías y Patrones Utilizados.

- **Node.js + Express**
- **MongoDB Atlas + Mongoose** (con `populate` y `lean`)
- **JWT + Passport** (autenticación con cookies `httpOnly`)
- **Nodemailer** (recuperación de contraseña)
- **Patrones de diseño**: Repository Pattern + DAO + DTO
- **Handlebars** para vistas del lado del servidor
- **Middleware** de autorización por roles
---

## Estructura del Proyecto. (src/)

src/

    ├── config/              → Configuraciones (DB, Passport, Mailer)
    ├── dao/                 → Capa de acceso directo a datos
    ├── dtos/                → Data Transfer Objects
    ├── middlewares/         → Middlewares de autenticación y autorización
    ├── models/              → Esquemas de Mongoose
    ├── repositories/        → Capa de lógica de negocio (Repository Pattern)
    ├── routes/              → Definición de rutas
    ├── views/               → Plantillas Handlebars
    ├── public/              → Archivos estáticos
    ├── app.js
    └── utils.js


## Instalación y Ejecución.

1. **Clonar el repositorio.**
   ```bash
   git clone https://github.com/sanchezign/Backend2-EntregaFinal.git
   cd Backend2-EntregaFinal


2.Instalar dependencias.

      npm install

3.Configurar variables de entorno.

    Copia el archivo .env.example a .env
    Completa las variables con tus datos (MongoDB Atlas, credenciales de Gmail, etc.)      

4.Iniciar el servidor.

    npm run dev
    El servidor correrá en http://localhost:8080

**Variables de Entorno. (.env)    **

    PORT=8080
    MONGO_URL=mongodb+srv://<usuario>:<contraseña>@cluster0.xxx.mongodb.net/backend-entrega-final?retryWrites=true&w=majority
    JWT_SECRET=tu_clave_secreta_muy_larga_y_segura
    EMAIL_USER=tu_email@gmail.com
    EMAIL_PASS=tu_contraseña_de_aplicación_de_google

 **Endpoints Principales.  ** 

   Método / Ruta / Descripción / Autorización.
   
    POST,/api/sessions/register,Registro de usuario,Pública
    POST,/api/sessions/login,Login + JWT en cookie,Pública
    GET,/api/sessions/current,Datos del usuario actual (DTO),JWT requerido
    POST,/api/sessions/forgot-password,Enviar email de recuperación,Pública
    POST,/api/products,Crear producto,Admin
    PUT,/api/products/:pid,Actualizar producto,Admin
    DELETE,/api/products/:pid,Eliminar producto,Admin
    GET,/api/products,Listar productos (con paginación),Pública
    POST,/api/carts/:cid/product/:pid,Agregar producto al carrito,User logueado
    GET,/,Vista Home,Pública
    GET,/products,Vista de productos (Handlebars),Pública


