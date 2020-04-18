# Commerce-CLI-App
This is a CLI app. bamazonCustomer.js allows the customer to search a virtual store and purchase items from it. bamazonManager.js allows a manager to search & manage a virtual store's available items and their inventories. Also included are commerceSchema and commerceSeed .sql files for creating a database for the store inventory.
## Instructions
When running the app, the user is prompted to choose to browse the store or exit the app. 
If the user chooses to browse, the app displays the id, name, and price of available items.
The user is prompted to choose an id and a quantity to purchase. If the requested items are in stock, the user is presented with a sale summary and the database is updated. 
The user is then presented with the initial prompt again.

The following screenshots walk through an example customer use case, including 3 purchase attempts:  
![Customer Step 1](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/customer_use_1.PNG)
![Customer Step 2](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/customer_use_2.PNG)
![Customer Step 3](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/customer_use_3.PNG)

The following screenshots walk through an example manager use case, including item addition, low inventory search, and inventory increase.
![Manager Step 1](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/manager_use_1.PNG)
![Manager Step 2](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/manager_use_2.PNG)
![Manager Step 3](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/manager_use_3.PNG)
![Manager Step 4](https://github.com/benjamintownsend02/Commerce-CLI-App/blob/master/Screenshots/manager_use_3.PNG)


## Dependencies
LIRI requires the following node modules:
1. mysql
2. inquirer
3. cli-table

Please see the package.json file for more information.

## Other Information
Version: 1.0

Future plans: Addition of supervisor functionality.

Author: benjamintownsend02

Known Issues: none
