DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Macbook', 'Tech', 200.00, 5), ('Pillow', 'Home', 5.00, 20), ('Blanket', 'Home', 10.00, 10), ('Playstation Controller', 'Tech', 50.00, 30), ('Cup', 'Home', 5.00, 50), ('Shirt', 'Clothing', 25.00, 30), ('Shoes', 'Clothing', 40.00, 17), ('Dog Food', 'Pets', 15.00, 11), ('Dog Bowl', 'Pets', 5.00, 32), ('Television', 'Tech', 600.00, 3);

SELECT*FROM products;
