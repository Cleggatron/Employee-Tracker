DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id INT AUTO INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL 
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE department(
    id INT PRIMARY KEY AUTO INCREMENT,
    name VARCHAR(30)
);
