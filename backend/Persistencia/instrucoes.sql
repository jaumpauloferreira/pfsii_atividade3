CREATE DATABASE sistema;

USE sistema;

CREATE TABLE departamento(
    dep_codigo INT NOT NULL AUTO_INCREMENT,
    dep_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_departamento PRIMARY KEY(dep_codigo)
);

CREATE TABLE funcionario(
    func_codigo INT NOT NULL AUTO_INCREMENT,
    func_nome VARCHAR(100) NOT NULL,
    func_dataAdmissao DATE,
    func_cargo VARCHAR(100) NOT NULL,
    dep_codigo INT NOT NULL,
    CONSTRAINT pk_funcionario PRIMARY KEY(func_codigo),
    CONSTRAINT fk_departamento_funcionario FOREIGN KEY(dep_codigo) REFERENCES departamento(dep_codigo)
);
