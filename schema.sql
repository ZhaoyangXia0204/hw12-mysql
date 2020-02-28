DROP DATABASE IF EXISTS addemployeesDB;
CREATE database addemployeesDB;

USE addemployeesDB;

CREATE TABLE department(
    id INT NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roleTable(
    id INT NOT NULL auto_increment,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT NOT NULL,
        PRIMARY KEY (id)

);


CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);
select * from department;
select * from roleTable;
select * from employee;

insert into department (name)
values ("Acounting"), ("Engineering"),("Securing");

insert into roleTable (title, salary, department_id)
values ("Engineer", 60000,1), ("Security", 100000, 2), ("Intern", 40000, 3);

insert into employee (first_name, last_name, role_id)
values ("Jin", "Liu", 1), ("Zhaoyang", "Xia", 2), ("Dwayne", "Wade", 3);