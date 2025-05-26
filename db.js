// db.js
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://carlospamech:6ayYDZE23jBJmYsL@micluster.jt1e4ks.mongodb.net/habitosApp?retryWrites=true&w=majority&appName=MiCluster'; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));
