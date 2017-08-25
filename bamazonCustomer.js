var mysql = require("mysql");
var prompt = require('prompt');
var prod;
var quantity;
var id;

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
var i;

connection.connect(function(err) {
  if (err) throw err;
  //  console.log("connected as id " + connection.threadId);

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

//     console.log(res);

    for (i = 0; i < res.length; i++) {
    console.log(endOfLine);
    console.log(res[i].product_name);
    console.log("$" + res[i].price);
    console.log("Item ID: " + res[i].item_id);
    console.log("Number available: " + res[i].stock_quantity + endOfLine);
    console.log("--------------------------------" + endOfLine);
  }

  prompt.start();
console.log("Please enter the product ID for the product you would like to buy." + endOfLine + "After you have entered the product ID and pressed enter, put in the number of items you would like to purchase and press enter." + endOfLine);
  prompt.get(['ID', 'number'], function (err, result) {
    if (err) { return onErr(err); }
id = result.ID;
quantity = result.number;

  connection.query("SELECT * FROM products WHERE item_id = " + result.ID, function(err, res) {
    if (err) throw err;
    prod = res;
    if (res[0].stock_quantity < result.number){
      console.log("I'm sorry. There are not enough items in stock to fill your order.");
      process.exit();
    }else{

        var sql = "UPDATE products SET stock_quantity = stock_quantity - " + result.number + " WHERE item_id = " + result.ID;
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Your order has been processed. " + quantity + " " + prod[0].product_name + "  Total: $" + prod[0].price * quantity);
          });
          connection.query("UPDATE products SET product_sales = product_sales + " + prod[0].price * quantity + " WHERE item_id = " + result.ID , function (err, result) {
          if (err) throw err;
          process.exit();
        });
    }
  });
  });
    function onErr(err) {
    console.log(err);
    return 1;
  }
  });
});
