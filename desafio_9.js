// Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.
// Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).
// Listar todos los documentos en cada colección.
// Mostrar la cantidad de documentos almacenados en cada una de ellas.
// Realizar un CRUD sobre la colección de productos:
//     Agregar un producto más en la colección de productos
//     Realizar una consulta por nombre de producto específico:
//         Listar los productos con precio menor a 1000 pesos.
//         Listar los productos con precio entre los 1000 a 3000 pesos.
//         Listar los productos con precio mayor a 3000 pesos.
//     Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
//     Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
//     Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
//     Borrar los productos con precio menor a 1000 pesos
// Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

.createTable("products", (table) => {
    table.increments("id");
    table.string("title", 30).notNullable();
    table.string("description", 30);
    table.float("price", 2).notNullable();
    table.timestamps("created_at");
    table.integer("code");
    table.string("picture").notNullable();
    table.integer("stock");
  })
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("email").notNullable().index();
    table.string("message").notNullable();
    table.timestamps("created_at");
  });

db.products.insertMany([
  { title: "product1", description: "product1", price: 120, created_at: new Timestamp(), code: 1, picture: "pic1", stock: 100 },
  { title: "product2", description: "product2", price: 580, created_at: new Timestamp(), code: 2, picture: "pic2", stock: 100 },
  { title: "product3", description: "product3", price: 900, created_at: new Timestamp(), code: 3, picture: "pic3", stock: 100 },
  { title: "product4", description: "product4", price: 1280, created_at: new Timestamp(), code: 4, picture: "pic4", stock: 100 },
  { title: "product5", description: "product5", price: 1700, created_at: new Timestamp(), code: 5, picture: "pic5", stock: 100 },
  { title: "product6", description: "product6", price: 2300, created_at: new Timestamp(), code: 6, picture: "pic6", stock: 100 },
  { title: "product7", description: "product7", price: 2860, created_at: new Timestamp(), code: 7, picture: "pic7", stock: 100 },
  { title: "product8", description: "product8", price: 3350, created_at: new Timestamp(), code: 8, picture: "pic8", stock: 100 },
  { title: "product9", description: "product9", price: 4320, created_at: new Timestamp(), code: 9, picture: "pic9", stock: 100 },
  { title: "product10", description: "product10", price: 4990, created_at: new Timestamp(), code: 10, picture: "pic10", stock: 100 },
]);

db.messages.insertMany([
    { email: "email1@example.com", message: "I'm email1", created_at: new Timestamp() },
    { email: "email2@example.com", message: "I'm email2", created_at: new Timestamp() },
    { email: "email3@example.com", message: "I'm email3", created_at: new Timestamp() },
    { email: "email4@example.com", message: "I'm email4", created_at: new Timestamp() },
    { email: "email5@example.com", message: "I'm email5", created_at: new Timestamp() },
    { email: "email6@example.com", message: "I'm email6", created_at: new Timestamp() },
    { email: "email7@example.com", message: "I'm email7", created_at: new Timestamp() },
    { email: "email8@example.com", message: "I'm email8", created_at: new Timestamp() },
    { email: "email9@example.com", message: "I'm email9", created_at: new Timestamp() },
    { email: "email10@example.com", message: "I'm email10", created_at: new Timestamp() },
  ]);

// 3) Listar todos los documentos de cada colección
db.getCollection('products').find({});
db.getCollection('messages').find({});

// 4) Mostrar la cantidad de documentos de cada colección
db.products.estimatedDocumentCount()
db.messages.estimatedDocumentCount()

// 5
// a) Agregar un producto más en la colección de productos
db.products.insertOne({ 
    title: "product11",
    description: "product11",
    price: 1234,
    created_at: new Timestamp(),
    code: 11,
    picture: "pic11",
    stock: 100
})

// b) i) Listar los productos con precio menor a 1000 pesos
db.products.find({ price: { $lt: 1000 } });

// b) ii) Listar los productos con precio entre los 1000 a 3000 pesos.
db.products.find({ $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }] });

// b) iii) Listar los productos con precio mayor a 3000 pesos.
db.products.find({ price: { $gt: 3000 } });

// b) iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato
db.products.find().sort({ price: 1 }).skip(2).limit(1);

// c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.products.updateMany({stock: 100}, { $set: { stock: 200 } });

// d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
db.products.updateMany({price: {$gt: 4000}}, { $set: { stock: 0 } });

// e) Borrar los productos con precio menor a 1000 pesos 
db.products.remove({price: {$lt: 1000}})

