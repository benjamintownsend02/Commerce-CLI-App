# Commerce-CLI-App
This is a CLI app that allows the user to search a virtual store for information on various items. It is run from bamazonCustomer.js. Also included are commerceSchema and commerceSeed .sql files for creating a database for the store inventory.
## Instructions
When running the app, the user is prompted to choose to browse the store or exit the app. 
If the user chooses to browse, the app displays the id, name, and price of available items.
The user is prompted to choose an id and a quantity to purchase. If the requested items are in stock, the user is presented with a sale summary and the database is updated. 
The user is then presented with the initial prompt again.

The following screenshots walk through an example use case:  
![Customer Step 1](https://github.com/benjamintownsend02/Commerce-CLI-App/tree/master/Screenshots/customer_use_1.PNG)
![Customer Step 2](https://github.com/benjamintownsend02/Commerce-CLI-App/tree/master/Screenshots/customer_use_2.PNG)
![Customer Step 3](https://github.com/benjamintownsend02/Commerce-CLI-App/tree/master/Screenshots/customer_use_3.PNG)

## Dependencies
LIRI requires the following node modules:
1. mysql
2. inquirer
3. cli-table

Please see the package.json file for more information.

## Other Information
Version: 1.0

Future plans: Addition of manager and supervisor functionality.

Author: benjamintownsend02

Known Issues: none
