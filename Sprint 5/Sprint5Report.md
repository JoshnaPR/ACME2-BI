# Sprint 5 Report (2/11/2025 - 3/17/2025)

## Sprint Video
[Sprint 5 Demo Video](https://youtu.be/3dQKRzfxpR8s)

## What's New
* We have fixed the issue with the search feature in the Event Inventory.
* We implemented reset password functionality.
* We made our final UI fixes.


## Work Summary

In this sprint, we have finshed our last functionalities and bugs and have fully prepped for deployment. We have met with the client to ask for any last minute opinions or changes and so far we are good to deploy. We will deploy with basic features using DigitalOcean before asking client for paid subscriptions.

## Unfinished Work

Currently, all we have to is deploy our application.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:
 
 * [Reset Password](https://github.com/JoshnaPR/ACME2-BI/issues/5)

 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 * We have no incomplete issues.

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
  * We were able to complete the project and prep for deployement.
 
Here's what we'd like to improve:
   * Work on communicating with the client better. 
   * Prep our meetings with our client better.

Here are changes we plan to implement in the next sprint:
   * Deploy our application.
   * Present the application to the client.
