require('console.table');
var mysql = require("mysql");
var prompt = require('prompt');
var inquirer = require("inquirer");

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

inquirer.prompt([
  {
    type: "list",
    name: "mainMenu",
    message: "Select an option.",
    choices: ["View Product Sales by Department", "Create New Department"]
  }
]).then(function(selection) {
  switch(selection.mainMenu) {
  case "View Product Sales by Department":
      connection.query("SELECT departments.departments.department_id, bamazon.products.department_name, departments.departments.department_name, departments.departments.over_head_costs, SUM (bamazon.products.product_sales) AS product_sales, (bamazon.products.product_sales - departments.departments.over_head_costs) AS total_profit FROM products INNER JOIN departments.departments ON bamazon.products.department_name=departments.departments.department_name GROUP BY departments.departments.department_id;", function(err, res) {
      if (err) throw err;
      console.table(res);
      process.exit();
      }
    );



      break;

    case "Create New Department":

    prompt.start();
    console.log("Please enter the name for the department you would like to add." + endOfLine + "After you have entered the name and pressed enter, put in the department overhead costs and press enter.");
    prompt.get(['department', 'costs'], function (err, result) {
      if (err) { return onErr(err); }
    var department = result.department;
    var costs = result.costs;
    var sql = "INSERT INTO departments.departments (department_name, over_head_costs) \nVALUES (\'" + department + "\', " + costs + ");";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(department + " department added.");
      process.exit();
    });});
    break;
    default:
        console.log("Error! This should not happen!");
        process.exit();
  }});}
);
