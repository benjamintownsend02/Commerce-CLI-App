var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: process.env.PORT || 3306,

  user: "root",
  //NOTE: Password left as placeholder "password" for security purposes
  password: "password",
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
        name: "managerMenu",
        type: "list",
        message: "Would you like to [VIEW PRODUCTS], [VIEW LOW INVENTORY], [ADD TO INVENTORY], [ADD NEW PRODUCT], or [EXIT]?",
        choices: ["VIEW PRODUCTS","VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
      })
      .then(function(answer) {
        if (answer.managerMenu === "VIEW PRODUCTS") {
          displayProducts();
        }
        else if(answer.managerMenu === "VIEW LOW INVENTORY") {
          displayLowInventory();
        }
        else if(answer.managerMenu === "ADD TO INVENTORY") {
          addToInventory();
        }
        else if(answer.managerMenu === "ADD NEW PRODUCT") {
          addNewProduct();
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
      var managerTable=new Table({
          head: ['ID','Product Name','Department Name','Product Price($)','Units in Stock'],
      });
      for(var i=0; i<res.length; i++)
      {
          managerTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
      }
      console.log(managerTable.toString());
      start();
    });
  }

//
function displayLowInventory(){
  console.log("Displaying low inventory products...\n");
  connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, res) {
    if (err) throw err;
    var managerTable=new Table({
        head: ['ID','Product Name','Department Name','Product Price($)','Units in Stock'],
    });
    for(var i=0; i<res.length; i++)
    {
        managerTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(managerTable.toString());
    start();
  });
}


function addToInventory() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter id of item to increase inventory of:",
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
        message: "Enter quantity to add to inventory:",
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
          if(answer.quantity<0)
          {
              console.log("Invalid quantity; please try again.");
          }
          else
          {
              var newQuantity=res[0].stock_quantity+answer.quantity;
              //console.log(newQuantity);
              updateProduct(res[0].item_id, newQuantity);
              var inventoryAddedSuccessString="Inventory was increased successfully! You added " + answer.quantity
              + " units of " + res[0].product_name + " to inventory.";
              console.log(inventoryAddedSuccessString);
          }  
          start();
        }
      );
    });
}




function addNewProduct() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "Enter the name of the new item:"
        },
        {
          name: "department",
          type: "input",
          message: "Enter the department name of the new item:"
        },
        {
          name: "price",
          type: "input",
          message: "Enter the price of the new item:",
          validate: function(value) {
            if (isNaN(value) === false) {
              return !value.includes("-");
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "Enter the quantity of the new item:",
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
          "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?)",
          [
            [answer.name, answer.department, answer.price, answer.quantity]
          ]
          ,
          function(err, res) {
            if (err) throw err;
              var itemAddedSuccessString="Item added successfully!";
              console.log(itemAddedSuccessString); 
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