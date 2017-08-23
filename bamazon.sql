DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Comic", "Toy", 22.50, 100), ("Toy", "Toy", 227.50, 100), ("Ink", "Commodity", 2200.50, 100), ("Goat", "Livestock", 222.22, 100), ("Sheep", "Livestock", 220.50, 100), ("Wood", "Lumber", 21.80, 400), ("DVD", "Media", 25.20, 200), ("Book", "Media", 22.50, 100), ("Dog", "Pet", 22.50, 100), ("Cat", "Pet", 22.50, 100);



-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
