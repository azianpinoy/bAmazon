var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "nbastar1",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "customerOrManager",
      type: "rawlist",
      message: "Would you like [CUSTOMER] view or [MANAGER] view? Choose '1' or '2'",
      choices: ["CUSTOMER", "MANAGER"]
    })
    .then(function(answer) {
      if (answer.customerOrManager.toUpperCase() === "CUSTOMER") {
        customerView();
      }
      else {
        managerView();
      }
    });
}

function customerView(){

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log("---------------");
    console.log("Inventory List:");
    for(var i = 0; i < results.length; i++){
      var productNum = i + 1;

      console.log("Item " + productNum + ": ID-" + results[i].item_id + " / Name-" + results[i].product_name + " / Price-$" + results[i].price + " / Quantity-" + results[i].stock_quantity);  
    }
    console.log("---------------");

     inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          message: "What item would you like to purchase? (enter ID #)",
          validate: function(value) {
          if (isNaN(value) === false && value > 0 && value <= results.length) {
            return true;
          }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase? (enter #)",
          validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
            return false;
          }
        }
      ])
      .then(function(answer) {

        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
          var newQuantity = chosenItem.stock_quantity - answer.quantity;

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              var totalCost = answer.quantity * chosenItem.price;
              console.log("---------------");
              console.log("Item purchased successfully! Inventory report has been updated. Total Cost = $" + totalCost);
              console.log("---------------");
              start();
            }
          );
        }
        else {
          console.log("---------------");
          console.log("There is not enough quanity in stock. Please try again.");
          console.log("---------------");
          customerView();
        }
      });
  });
}
