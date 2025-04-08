CREATE DATABASE MarketplacePagWeb;
 GO
 
 USE MarketplacePagWeb;
 GO
 
 -- Tabla de los usuarios
 CREATE TABLE Usuario (
     id INT IDENTITY(1,1) PRIMARY KEY,
     nombre NVARCHAR(255) NOT NULL,
     correo NVARCHAR(255) UNIQUE NOT NULL,
     contrasena NVARCHAR(255) NOT NULL,
     tipo CHAR(10) CHECK (tipo IN ('cliente', 'comprador')) NOT NULL
 );
 GO
 
 -- Tabla de productos
 CREATE TABLE Producto (
     id INT IDENTITY(1,1) PRIMARY KEY,
     nombre NVARCHAR(255) NOT NULL,
     descripcion NVARCHAR(MAX),
     precio DECIMAL(10,2) NOT NULL,
     stock INT NOT NULL,
     vendedor_id INT NOT NULL,
	 imagen_url NVARCHAR(MAX) NULL,
     CONSTRAINT FK_Vendedor FOREIGN KEY (vendedor_id) REFERENCES Usuario(id)
 );
 GO
 
 -- Tabla de favoritos
 CREATE TABLE Favoritos (
     usuario_id INT NOT NULL,
     producto_id INT NOT NULL,
     CONSTRAINT PK_Favoritos PRIMARY KEY (usuario_id, producto_id),
     CONSTRAINT FK_Favoritos_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
     CONSTRAINT FK_Favoritos_Producto FOREIGN KEY (producto_id) REFERENCES Producto(id)
 );
 GO
 
 -- Tabla de compras
 CREATE TABLE Compra (
     id INT IDENTITY(1,1) PRIMARY KEY,
     comprador_id INT NOT NULL,
     producto_id INT NOT NULL,
     cantidad INT NOT NULL,
     fecha DATETIME DEFAULT GETDATE(),
     CONSTRAINT FK_Compra_Usuario FOREIGN KEY (comprador_id) REFERENCES Usuario(id),
     CONSTRAINT FK_Compra_Producto FOREIGN KEY (producto_id) REFERENCES Producto(id)
 );
 GO
 
 -- Tabla de vista principal
 CREATE TABLE VistaPrincipal (
     id INT IDENTITY(1,1) PRIMARY KEY,
     usuario_id INT NOT NULL,
     contenido NVARCHAR(MAX),
     CONSTRAINT FK_VistaPrincipal FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
 );
 GO
 
 -- Tabla de vista de usuario cliente
 CREATE TABLE VistaUsuarioCliente (
     id INT IDENTITY(1,1) PRIMARY KEY,
     usuario_id INT NOT NULL,
     preferencias NVARCHAR(MAX),
     CONSTRAINT FK_VistaUsuarioCliente FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
 );
 GO
 
 -- Tabla de vista de usuario comprador
 CREATE TABLE VistaUsuarioComprador (
     id INT IDENTITY(1,1) PRIMARY KEY,
     usuario_id INT NOT NULL,
     historial_compras NVARCHAR(MAX),
     CONSTRAINT FK_VistaUsuarioComprador FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
 );
 GO
 
 -- Tabla de vista de producto
 CREATE TABLE VistaProducto (
     id INT IDENTITY(1,1) PRIMARY KEY,
     producto_id INT NOT NULL,
     detalles NVARCHAR(MAX),
     CONSTRAINT FK_VistaProducto FOREIGN KEY (producto_id) REFERENCES Producto(id)
 );
 GO

 --primero lo primero, insertar usuario XD
 INSERT INTO Usuario (nombre, correo, contrasena, tipo) 
VALUES ('Pepito PechoAbierto', 'pepillo@gmail.com', '1234', 'comprador');


 --Toca insertar datos a la tabla productos para mostrar las imágenes :I
INSERT INTO Producto (nombre, descripcion, precio, stock, vendedor_id, imagen_url)
VALUES 
('Case', 'Case para PC gamer', 90.00, 120, 2, '/Imagenes/case.png'),
('Cuadro','Cuadro elegante',5.00,5,2, '/Imagenes/cuadroXD.png'),
('GTA IV','Videojuego PS3',25.00,10,2, '/Imagenes/gta4.png'),
('Playstation 4','Consola de juegos',180.00,40,2, '/Imagenes/playstation4.png'),
('Nintendo Switch','Consola de juegos',180.00,5,2, '/Imagenes/switch.png'),
('Peluche de Yoshi','Peluche',5.00,20,2, '/Imagenes/yoshi.png');

