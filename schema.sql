DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT NOT NULL PRIMARY KEY ,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);
CREATE TABLE IF NOT EXISTS employee (
  id INT NOT NULL PRIMARY KEY,
  first_name  VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);