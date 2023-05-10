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
);

CREATE TABLE administrador (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido  VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	telefono VARCHAR(10),
);

CREATE TABLE platillo (
	id SERIAL PRIMARY KEY,
	nombre_platillo VARCHAR(30) NOT NULL UNIQUE,
	descripcion_platillo VARCHAR(255) NOT NULL,
	precio_platillo float,
);

CREATE TABLE orden (
	id SERIAL PRIMARY KEY,
	id_cliente SERIAL FOREIGN KEY NOT NULL,
	fecha_orden DATE NOT NULL,
	total float NOT NULL
);

CREATE TABLE orden_detalle (
	id SERIAL PRIMARY KEY,
	id_orden SERIAL FOREIGN KEY NOT NULL,
	id_platillo SERIAL FOREIGN KEY NOT NULL,
	cantidad INT NOT NULL,
	subtotal FLOAT NOT NULL
)

CREATE TABLE credencialesCliente (
	id SERIAL PRIMARY KEY,
	token VARCHAR(255),
	confirmado BOOLEAN,
	rol VARCHAR(15) DEFAULT: "cliente"
)

CREATE TABLE credencialesAdministrador(
	id SERIAL PRIMARY KEY,
	token VARCHAR(255),
	rol VARCHAR(15) DEFAULT "administrador"
)