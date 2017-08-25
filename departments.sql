DROP DATABASE IF EXISTS departments;

CREATE DATABASE departments;

USE departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toy", 223367.50), ("Commodity", 223300.50), ("Livestock", 222332.22), ("Lumber", 40970), ("Media", 25090.20), ("Pet", 10000);



-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
