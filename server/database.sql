CREATE DATABASE restaurant
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE client (
	id SERIAL PRIMARY KEY,
	client_name VARCHAR(50) NOT NULL,
	lastName  VARCHAR(50) NOT NULL,
	middleName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	tel VARCHAR(10),
	birth_date DATE
);

CREATE TABLE administrator (
	id SERIAL PRIMARY KEY,
    id_address SERIAL FOREIGN KEY NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	lastName  VARCHAR(50) NOT NULL,
	middleName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	tel VARCHAR(10) NOT NULL,
	birth_date DATE NOT NULL
);

CREATE TABLE admin_address (
    id SERIAL PRIMARY KEY, 
    street_name VARCHAR(20) NOT NULL,
    neighborhood_name VARCHAR(20) NOT NULL,
    residence_number VARCHAR(5) NOT NULL,
    postal_code INT NOT NULL,
)

CREATE TABLE dish (
	id SERIAL PRIMARY KEY,
	dish_name VARCHAR(30) NOT NULL,
	dish_description VARCHAR(255) NOT NULL,
	dish_price int,
);

CREATE TABLE order (
	id SERIAL PRIMARY KEY,
	id_client SERIAL FOREIGN KEY NOT NULL,
	order_date DATE NOT NULL,
	bill int NOT NULL
);

CREATE TABLE order_detail (
	id SERIAL PRIMARY KEY,
	id_order SERIAL FOREIGN KEY NOT NULL,
	unitary_price FLOAT NOT NULL,
	amount INT NOT NULL,
	subtotal FLOAT NOT NULL
)

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    id_client SERIAL FOREIGN KEY NOT NULL,
    id_items SERIAL FOREIGN KEY NOT NULL,
)

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    id_cart SERIAL FOREIGN KEY NOT NULL,
    id_dish SERIAL FOREIGN KEY NOT NULL
)