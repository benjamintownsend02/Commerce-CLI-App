var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",
  //@TODO: NOTE: Password left as placeholder "password" for security purposes
  password: "Dangercloseuglynose1!",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });


function start() {
    inquirer
      .prompt({
        name: "browseOrExit",
        type: "list",
        message: "Would you like to [BROWSE] our store or [EXIT]?",
        choices: ["BROWSE","EXIT"]
      })
      .then(function(answer) {
        if (answer.browseOrExit === "BROWSE") {
          displayProducts();
        }
        else{
          connection.end();
        }
      });
  }



function displayProducts() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      var customerTable=new Table({
          head: ['ID','Product Name','Product Price($)'],
      });
      for(var i=0; i<res.length; i++)
      {
          customerTable.push([res[i].item_id, res[i].product_name, res[i].price]);
      }
      console.log(customerTable.toString());
      promptCustomer();
    });
  }


function promptCustomer() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the id of the item you would like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return !value.includes(".") && !value.includes("-");
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many of this item would you like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return !value.includes(".") && !value.includes("-");
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        connection.query(
          "SELECT * FROM products WHERE ?",
          {
            item_id: answer.id
          },
          function(err, res) {
            if (err) throw err;
            if(answer.quantity<1)
            {
                console.log("No purchase. Sale cancelled.");
            }
            else if(answer.quantity>res[0].stock_quantity)
            {
                console.log("Insufficient stock! Sale cancelled.");
            }
            else
            {
                var newQuantity=res[0].stock_quantity-answer.quantity;
                //console.log(newQuantity);
                updateProduct(res[0].item_id, newQuantity);
                var purchasePrice=answer.quantity*res[0].price;
                var purchaseSuccessString="Your purchase was completed successfully! You purchased " + answer.quantity
                + " units of " + res[0].product_name + " for $" + purchasePrice.toFixed(2) + ".";
                console.log(purchaseSuccessString);
            }  
            start();
          }
        );
      });
}

//
function updateProduct(currentID, newQuantity) {
    //console.log("Product values updated! ...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newQuantity
        },
        {
          item_id: currentID
        }
      ],
      function(err, res) {
        if (err) throw err;
        //console.log(res.affectedRows + " products updated!\n");
      }
    );
}