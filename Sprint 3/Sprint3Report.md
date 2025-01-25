# Sprint 3 Report (11/06/2024 - 12/05/2024)

## Sprint Video
[Sprint 3 Demo Video](https://youtu.be/gwWP-NRSeB8)

## What's New
* We have added a login and signup page for our project.
* We have integrated both the login and inventories together.


## Work Summary

In this sprint, continued to work on the inventories and completed the login and sign up for our project. We also met with our client to discuss our progress on the project. We also met with the professor to discuss our progress on the project. We also worked on the documentation for our project. We made sure to list out what we plan to work on for the next semester.

## Unfinished Work

Currently, we have most of the functionality and UI done for the inventories but, we need to implement our logout and 2FA for our project. We also need to test our project more to make sure that it is working as intended.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * [Create a new user account](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=81407651&issue=JoshnaPR%7CACME2-BI%7C9)
 * [Logging with correct credentials](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=80006187&issue=JoshnaPR%7CACME2-BI%7C1)

 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * [Logging Out Takes Me To The Login Page](https://github.com/JoshnaPR/ACME2-BI/issues/6) - This will be done in the next semester.
 * [Reset Password](https://github.com/JoshnaPR/ACME2-BI/issues/5) - This will be done in the next semester.
 * [2 Factor Authorization - Google Authenticator](https://github.com/JoshnaPR/ACME2-BI/issues/4) - This will be implemented within the next semester.


## Code Files for Review
Here are the current code files for review:
* Backend
  * Controllers:
    * [braController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/braController.js)
    * [eventController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/eventController.js)
    * [authController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/authController.js)
  * Models:
    * [Bra.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Bra.js)
    * [Events.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Events.js)
    * [User.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/User.js)
  * Routes:
    * [braRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/braRoutes.js)
    * [eventRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/eventRoutes.js)
    * [authRoute.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/authRoute.js)
    * [userRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/userRoutes.js)
  * Server:
    * [package.json](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/package.json)
    * [server.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/server.js)
  * Middleware:
    * [authMiddleware.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/middleware/authMiddleware.js)
    * [roleMiddleware.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/middleware/roleMiddleware.js)
* FrontEnd
  * Components:
    * [BraList.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/components/BraList.js)
    * [EventList.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/components/EventList.js)
    * [braManager.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/components/braManager.js)
    * [eventManager.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/components/eventManager.js)
  * Pages:
    * [BraInventory.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/BraInventory.js)
    * [EventInventory.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/EventInventory.js)
    * [HomePage.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/HomePage.js)
    * [Login.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/Login.js)
    * [Signup.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/Signup.js)
    * [LandPage.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/LandingPage.js)
  * Services:
    * [attendeeService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/attendeeService.js)
    * [braService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/braService.js)
    * [eventServoce.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/eventService.js)
  * Styles:
    * [BraInventory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/BraInventory.css)
    * [EventInvetory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/EventInventory.css)
    * [HomePage.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/HomePage.css)
    * [style.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/style.css)
    * [LandPage.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/LandingPage.css)
* App
  * [App.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/App.js)
  
## Retrospective Summary
Here's what went well:
  * Working on the documentation went well since we divided the work evenly.
  * We were able to meet with our client and the professor to discuss our progess on the project.
  * We were able to make significant progess in our project and test our project more.
 
Here's what we'd like to improve:
   * Work on integrating our different components together quicker. 
   * Test our project more to make sure that it is working as intended.
   * Make sure that our project is ready for the next semester.
  
Here are changes we plan to implement in the next sprint:
   * Finish the project by implementing the logout and 2FA.
   * Upload the project to GoDaddy.
   * Do a test run of the project by having the clients use it to make sure that it is working as intended.
