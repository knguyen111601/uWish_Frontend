# Unit Project 3
## Wishlist App

## Project Summary 

Utilizing JavaScript, MongoDB, Express, React, and Node, we are creating a wishlist app. This app will provide users a place to add items to a "wish list". This app will grant users a place to, perhaps, keep track of or store the information of the items they desire. Users can insert the item's name, image, price, and URL to a form and the app will automatically place them on the screen for users to click on and view details about. 

## Roles 
- Backend (Controllers, DataBase, Models, Server) - Kenny Nguyen
- Frontend (Main.js) - Tony Daniels
- Frontend (Show.js) - Ahmed Sorour
- Frontend (Index.js, Styling) - Kenny Nguyen

## Models

The Model will consist of a schema that will have 4 properties. Those properties are a Name, Image, Price, and URL.

- name: String
- image : String
- price: String
- url: String

## Route Table 

The routes follow full CRUD and RESTful methods 

| url                 | method | action                                 |        |
|---------------------|--------|----------------------------------------|--------|
| /wishlist           | get    | The main/ index page                   | index  |
| /wishlist/:id       | get    | get a particular wishlist item         | show   |
| /wishlist          | post   | post the new item                      | create |
| /wishlist/:id/      | put    | update the wishlist item from the list      | update |
| /wishlist/:id       | delete | delete a wishlist                 | delete |

## User Stories

- User will be able to sign up or log in to a personal account 
- User will see all of their items they have added to their wishlist on the home index page
- Users can create new items by filling out a form 
- Users will see their new item show up on the home page and be clickable to view more details
- Users can update/edit their item on the show page
- Users can delete items 

## Challenges


## List of Technologies
- node.js
- REACT
- EXPRESS
- SASS
- MongoDB
