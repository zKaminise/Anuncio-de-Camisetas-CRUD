CREATE DATABASE CamisetaProjeto;

\c CamisetaProjeto;

CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Camiseta (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    price INTEGER,
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id) ON DELETE SET NULL
);