# Backend II - Entrega Final

Entrega final del curso Backend II. Implementación completa de una **API REST de e-commerce** con arquitectura profesional.

---

## Descripción del Proyecto

Este proyecto es una API backend para un e-commerce que incluye gestión de usuarios, productos, carritos y compras. Se destaca por su **arquitectura limpia y escalable** utilizando los patrones **Repository + DAO**, **DTO** y middlewares de autorización por roles.

### Objetivos Cumplidos ✓

- Patrón **Repository + DAO** implementado correctamente
- Uso de **DTO** en la ruta `/current` (sin exponer datos sensibles)
- Sistema completo de **recuperación de contraseña** por email (token de 1 hora + validación de no repetir contraseña anterior)
- Middleware de autorización por roles (`admin` y `user`)
- Solo **admin** puede crear, actualizar y eliminar productos
- Solo usuarios logueados pueden agregar productos al carrito
- Modelo `Ticket` con lógica robusta de finalización de compra
- Paginación profesional en productos
- Vistas con **Handlebars**

---

## Tecnologías y Patrones Utilizados

- **Node.js + Express**
- **MongoDB + Mongoose** (con `populate` y `lean`)
- **JWT + Passport** (autenticación con cookies `httpOnly`)
- **Nodemailer** (recuperación de contraseña)
- **Patrones de diseño**: Repository Pattern + DAO + DTO
- **Handlebars** para vistas del lado del servidor
- **Middleware** de autorización por roles

---

## Estructura del Proyecto (src/)

src/
├── config/              → Configuraciones (DB, Passport, Mailer)
├── dao/
│   ├── classes/         → Clases DAO (acceso directo a la base de datos)
│   └── models/          → Esquemas de Mongoose
├── dtos/                → Data Transfer Objects
├── managers/            → Gestores (capa legacy)
├── middlewares/         → Middlewares de autenticación y autorización
├── repositories/        → Repositorios (capa de abstracción)
├── routes/              → Definición de rutas
├── views/               → Plantillas Handlebars
├── app.js
└── utils.js


## Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/sanchezign/Backend2-EntregaFinal.git
   cd Backend2-EntregaFinal


Instalar dependencias

      npm install

Configurar variables de entorno

    Copia el archivo .env.example a .env
    Completa las variables con tus datos (MongoDB Atlas, credenciales de Gmail, etc.)      

Iniciar el servidor

    npm run dev
    El servidor correrá en http://localhost:8080

Variables de Entorno (.env)    

PORT=8080
       
    MONGO_URL=tu_string_de_conexion_mongodb_atlas
    JWT_SECRET=tu_clave_secreta_muy_larga_y_segura
    EMAIL_USER=tu_email@gmail.com
    EMAIL_PASS=tu_contraseña_de_aplicacion_de_google

 Endpoints Principales   

   Método,Ruta,Descripción,Autorización
   
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


