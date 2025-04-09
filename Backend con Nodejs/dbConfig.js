const config = {
    user: 'CheleCuajada',
    password: 'riverads2005',
    server: 'localhost\\SQLEXPRESS', // esta onda me daba error XDDDD
    database: 'MarketplacePagWeb',
    options: {
        encrypt: false, // Si estás usando SQL Server local, esto puede ir en false
        trustServerCertificate: true // Para evitar errores de certificados en local
    }
};

module.exports = config;