CREATE DATABASE restaurant
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE cliente (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido  VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	telefono VARCHAR(10),
	fecha_de_nacimiento DATE
);

CREATE TABLE administrador (
	id SERIAL PRIMARY KEY,
    id_direccion SERIAL FOREIGN KEY NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	apellido  VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	telefono VARCHAR(10),
	fecha_de_nacimiento DATE
);

CREATE TABLE administrador_direccion (
    id SERIAL PRIMARY KEY, 
    calle VARCHAR(20) NOT NULL,
    colonia VARCHAR(20) NOT NULL,
    numero_de_casa VARCHAR(5) NOT NULL,
    codigo_postal INT NOT NULL,
)

CREATE TABLE platillo (
	id SERIAL PRIMARY KEY,
	nombre_platillo VARCHAR(30) NOT NULL,
	descripcion_platillo VARCHAR(255) NOT NULL,
	precio_platillo int,
);

CREATE TABLE orden (
	id SERIAL PRIMARY KEY,
	id_cliente SERIAL FOREIGN KEY NOT NULL,
	fecha_orden DATE NOT NULL,
	total int NOT NULL
);

CREATE TABLE orden_detalle (
	id SERIAL PRIMARY KEY,
	id_orden SERIAL FOREIGN KEY NOT NULL,
	precio_unitario FLOAT NOT NULL,
	cantidad INT NOT NULL,
	subtotal FLOAT NOT NULL
)

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    id_cliente SERIAL FOREIGN KEY NOT NULL,
    id_items SERIAL FOREIGN KEY NOT NULL,
)

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    id_carrito SERIAL FOREIGN KEY NOT NULL,
    id_platillo SERIAL FOREIGN KEY NOT NULL
)