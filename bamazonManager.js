var inquirer = require("inquirer");
var mysql = require("mysql");
var prompt = require('prompt');


var i;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "2648769853",
  database: "bamazon"
});
var endOfLine = require('os').EOL;

connection.connect(function(err) {
  if (err) throw err;
//  console.log("connected as id " + connection.threadId);

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

  //  console.log(res);
    inquirer.prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "Select an option.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      }

    ]).then(function(selection) {
      switch(selection.mainMenu) {
      case "View Products for Sale":
      for (i = 0; i < res.length; i++) {

      console.log(res[i].product_name);
      console.log("$" + res[i].price);
      console.log("Item ID: " + res[i].item_id);
      console.log("Number available: " + res[i].stock_quantity + endOfLine);
            console.log("Sales: " + res[i].product_sales + endOfLine);
      console.log("--------------------------------" + endOfLine);
    }
      process.exit();
          break;
      case "View Low Inventory":
      console.log("--------------------------------" + endOfLine);
      for (i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 5){
      console.log(res[i].product_name);
      console.log("$" + res[i].price);
      console.log("Item ID: " + res[i].item_id);
      console.log("Number available: " + res[i].stock_quantity + endOfLine);
      console.log("--------------------------------" + endOfLine);}
    }
      process.exit();
          break;
      case "Add to Inventory":
      prompt.start();
      console.log("Please enter the product ID for the product you would like to restock." + endOfLine + "After you have entered the product ID and pressed enter, put in the number of items you would like to add to inventory and press enter." + endOfLine);
      prompt.get(['ID', 'number'], function (err, result) {
        if (err) { return onErr(err); }
      id = result.ID;
      quantity = result.number;

      connection.query("SELECT * FROM products WHERE item_id = " + result.ID, function(err, res) {
        if (err) throw err;
        prod = res;


            var sql = "UPDATE products SET stock_quantity = stock_quantity + " + result.number + " WHERE item_id = " + result.ID;
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log(quantity + " " + prod[0].product_name + " Added to inventory.");
              process.exit();
            });});});
          break;

      case "Add New Product":

      prompt.start();
      console.log("Please enter the name for the product you would like to add." + endOfLine + "After you have entered the name and pressed enter, put in the department you would like to add the product to and press enter." + endOfLine + "Then input the price in dollars. Only enter digits and a decimal point.");
      prompt.get(['name', 'department', 'price'], function (err, result) {
        if (err) { return onErr(err); }
      var name = result.name;
      var department = result.department;
      var price = result.price;




            var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) \nVALUES (\'" + name + "\', \'" + department + "\', " + price + ", 0);";
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log(name + " Added to inventory.");
              // console.log(sql);
              process.exit();
            });

        });

          break;
      default:
          console.log("Error! This should not happen!");
  }




    });

  });
});

function manager() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.

}
