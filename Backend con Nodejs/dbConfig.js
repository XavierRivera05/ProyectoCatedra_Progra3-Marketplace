const config = {
    user: 'CheleCuajada',
    password: 'riverads2005',
    server: 'localhost\\SQLEXPRESS', // esta onda me daba error XDDDD
    database: 'MarketplacePagWeb',
    options: {
        encrypt: false, 
        trustServerCertificate: true // Para evitar errores de certificados en local
    }
};

module.exports = config;