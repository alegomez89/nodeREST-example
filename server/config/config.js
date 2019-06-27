// =====================
//   Puerto
// =====================

process.env.PORT = process.env.PORT || 3000;

// =====================
//   Entorno
// =====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =====================
//   Vencimiento del Token
//   60 segundos
//   60 minutos
//   24 horas
//   3 dias
// =====================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =====================
//   Semilla de Autenticacion
// =====================

process.env.SEED = process.env.SEED || 'secret-desa';

// =====================
//   Base de Datos
// =====================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;

// =====================
//   Google Client ID
// =====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '349363838280-qs9bh9bfuka201kcivfebubr9f9ru9tj.apps.googleusercontent.com';

