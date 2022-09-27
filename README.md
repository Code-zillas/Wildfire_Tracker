## Project Title: 
Wildfire Tracker

## Project Overview: 

Because of climate change situation with wildfires became more difficult with every year. In this case we created an application, named "Wildfire Tracker", related with information about ongoing natural disasters, and especially about wildfires events. The main idea of the application: development of a single information space for firefighters, police or another interested communities of users about wildfires events in real-time.


## Project Description (technical) 

This application is built as MERN stack application:
- Frontend:
    - React js
    - CSS

- Backend:
    - MongoDB (cloud version - Atlas)
    - Express js
    - Node js
    - Google API (for maps)

## Project Description (for users) 

<img src="https://user-images.githubusercontent.com/102720711/192211376-851e9d6f-3a37-45f5-a204-fb7130f6a66a.png" width="500" height="400" align="right" /> 

    1. Create an account 
    2. Log In to account
    3. The user can easily add information about an active fire (live data) in three steps:
    - Step 1: Zoom "+" or "-" to the map, to find the specific area of the active wildfire.
    - Step 2: Choose the place by clicking on it.
    - Step 3: Insert a marker in the map and add details in the pop-up window for each incident: 
      - wildfire location 
      - short description about situation 
      - give evaluation of wildfire on 5-points scale, where is: 1 small fire and 5 dangerous and strong fire 

After creating marker, information about wildfire is transmitted to the server and stored in database. 


## How to install and run the app ##

- Clone the repo from GitHub.
- Establish a connection for the "MONGODB_URI" variable in "server.js" file which is listed to the backend part.
- Install some necessary packages (dependencies) on client side and server side: running command "npm install"
- Split your terminal for full control (optional).
- Run the backend part with "nodemon server.js" or "npm start"
- Run the frontend part with "npm start".
- Enjoy the experience and become an active "Planet Saver".

## Difficulties we faced ##

- Unstable connection between the backend part with the MongoDB Atlas.
- Time-consuming procedure for activating the Google API Key for maps.

## Contributors ##

Group 7: Xenia Rachouti && Vasilis Delas.





