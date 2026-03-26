// src/scripts/seedProducts.js
import mongoose from 'mongoose';
import Product from '../dao/models/Product.js';
import 'dotenv/config'; // ← Carga las variables de .env automáticamente

// Productos de prueba
const products = [
  {
    title: "Mouse Gamer RGB",
    description: "Mouse inalámbrico con 16000 DPI y luces RGB",
    code: "MOUSE-RGB-001",
    price: 45.99,
    stock: 25,
    category: "Periféricos",
    status: true,
    thumbnails: ["https://example.com/mouse-rgb.jpg"]
  },
  {
    title: "Teclado Mecánico Gamer",
    description: "Teclado con switches rojos y RGB",
    code: "TECL-MEC-001",
    price: 89.99,
    stock: 15,
    category: "Periféricos",
    status: true,
    thumbnails: ["https://example.com/teclado.jpg"]
  },
  {
    title: "Monitor 27\" 144Hz",
    description: "Monitor Full HD para gaming",
    code: "MON-27-144",
    price: 249.99,
    stock: 8,
    category: "Monitores",
    status: true,
    thumbnails: ["https://example.com/monitor.jpg"]
  }
];

async function seed() {
  try {
    // Conexión usando la misma URL que tu app (de .env)
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB Atlas correctamente');

    // Limpia la colección (opcional, comenta si no querés borrar)
    await Product.deleteMany({});
    console.log('Colección products limpiada');

    // Inserta los productos
    const inserted = await Product.insertMany(products);
    console.log(`Se insertaron ${inserted.length} productos exitosamente`);

  } catch (error) {
    console.error('Error al sembrar productos:', error.message);
  } finally {
    // Siempre cierra la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  }
}

seed();