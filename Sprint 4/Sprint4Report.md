# Sprint 4 Report (1/06/2025 - 2/10/2025)

## Sprint Video
[Sprint 4 Demo Video]()

## What's New
* We have finally implemented the 2FA.
* We implemented logging functionality for users to check.
* We have made sure that bras given away reflect in the bra inventory.


## Work Summary

In this sprint, we wrapped up our final functionalities for the inventory management system. These features include 2FA, Logs, and ensuring changes in the event/attendee inventory reflect in the bra inventory. We have run into some small bugs but, those will be fixed soon and well before the submission of the next sprint. We are almost ready for deployement and will plan to do so soon.

## Unfinished Work

Currently, the only feature to be done is the Change Password functionality for users. As for the inventories, there is a small UI issue with the log modal and a bug with the search functionality with the event/attendee inventory.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * [Logs](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=97045957&issue=JoshnaPR%7CACME2-BI%7C57)
 * [Attendee infor takes away from bra inventory](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=97045984&issue=JoshnaPR%7CACME2-BI%7C58)
 * [2 Factor Authorization - Google Authenticator](https://github.com/JoshnaPR/ACME2-BI/issues/4)

 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * [Reset Password](https://github.com/JoshnaPR/ACME2-BI/issues/5) - This will be done soon.


## Code Files for Review
Here are the current code files for review:
* Backend
  * Controllers:
    * [braController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/braController.js)
    * [eventController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/eventController.js)
    * [authController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/authController.js)
    * [logController](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/logController.js)
  * Models:
    * [Bra.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Bra.js)
    * [Events.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Events.js)
    * [User.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/User.js)
    * [Log.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Log.js)
  * Routes:
    * [braRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/braRoutes.js)
    * [eventRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/eventRoutes.js)
    * [logRoute.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/logRoute.js)
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
    *  [Logout.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/Logout.js)
    *  [TwoFA.s](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/TwoFA.js)
  * Services:
    * [attendeeService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/attendeeService.js)
    * [braService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/braService.js)
    * [eventServoce.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/eventService.js)
    * [logService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/logService.js)
  * Styles:
    * [BraInventory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/BraInventory.css)
    * [EventInvetory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/EventInventory.css)
    * [HomePage.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/HomePage.css)
    * [style.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/style.css)
    * [LandPage.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/LandingPage.css)
    * [TwoFA.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/pages/TwoFA.css)
* App
  * [App.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/App.js)
  
## Retrospective Summary
Here's what went well:
  * Working on the documentation went well since we divided the work evenly.
  * We were able to meet with our client and the professor to discuss our progess on the project.
  * We were able to make significant progess in our project and test our project more.
 
Here's what we'd like to improve:
   * Work on communicating with the client better. 
   * Communicate with each other what we changed.
   * Finish easy tasks faster.
  
Here are changes we plan to implement in the next sprint:
   * Finish the project by fixing small bugs.
   * Prepare for deployement .
   * Do a test run of the project by having the clients use it to make sure that it is working as intended.
