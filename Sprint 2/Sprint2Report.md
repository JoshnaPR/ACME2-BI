# Sprint 2 Report (10/06/2024 - 11/05/2024)

## Sprint Video
[Sprint 2 Demo Video]()

## What's New
* We have made both the bra and event/attendee inventories with a user friendly UI. 
* Users have the ability to add, edit, or delete an bra, event, or attendee.
* We have a home page that provides easy navigation to both inventories
* A login page has been made



## Work Summary

In this sprint, we have begun and made a significant amount of progress since we have most of the inventory functionalities and UI finished. All that we need to complete is the login, signup, and 2FA functionalities and pages. Other than that, we will start testing our inventory management system in the next sprint.

## Unfinished Work

Currently, we have most of the functionality and UI done for the inventories but, we need to implement our login, signup, and 2FA for our users.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * [Search items from database](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=80006110&issue=JoshnaPR%7CACME2-BI%7C3)
 * [Adding/Removing items in the database](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=80006153&issue=JoshnaPR%7CACME2-BI%7C2)
 * [See updates in the database](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=83109666&issue=JoshnaPR%7CACME2-BI%7C12)
 * [UI for the homepage](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=83379647&issue=JoshnaPR%7CACME2-BI%7C16) - Just need to implement what the client wanted.
 * [UI for bra inventory page](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=83379722&issue=JoshnaPR%7CACME2-BI%7C17) - Just need to implement what the client wanted.
 * [UI for event/attendee invetory page](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=83379752&issue=JoshnaPR%7CACME2-BI%7C18) - Just need to implement what the client wanted.
 * [Sprint 2](https://github.com/users/JoshnaPR/projects/2/views/2?pane=issue&itemId=85442729&issue=JoshnaPR%7CACME2-BI%7C36)

 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * [Create a new User Account](https://github.com/JoshnaPR/ACME2-BI/issues/9) - The login page has been created but not the signup page.
 * [Logging Out Takes Me To The Login Page](https://github.com/JoshnaPR/ACME2-BI/issues/6) - Login page handles the logout but, has not been tested.
 * [Reset Password](https://github.com/JoshnaPR/ACME2-BI/issues/5) - This will be done in the login page.
 * [2 Factor Authorization - Google Authenticator](https://github.com/JoshnaPR/ACME2-BI/issues/4) - This will be implemented within the login page.
 * [Logging In With The Correct Credentials](https://github.com/JoshnaPR/ACME2-BI/issues/1) - We need to test if a test user that we create will be able to log in.

## Code Files for Review

Here are the current code files for review:
* Backend
  * Controllers:
    * [braController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/braController.js)
    * [eventController.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Controllers/eventController.js)
  * Models:
    * [Bra.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Bra.js)
    * [Events.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Models/Events.js)
  * Routes:
    * [braRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/braRoutes.js)
    * [eventRoutes.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/Routes/eventRoutes.js)
  * Server:
    * [package.json](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/package.json)
    * [server.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/Backend/server.js)
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
  * Services:
    * [attendeeService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/attendeeService.js)
    * [braService.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/braService.js)
    * [eventServoce.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/services/eventService.js)
  * Styles:
    * [BraInventory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/BraInventory.css)
    * [EventInvetory.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/EventInventory.css)
    * [HomePage.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/HomePage.css)
    * [style.css](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/styles/style.css)
* App
  * [App.js](https://github.com/JoshnaPR/ACME2-BI/blob/main/Inventory%20Management%20System/frontend/src/App.js)
  
## Retrospective Summary
Here's what went well:
  * Working on the documentation went well since we divided the work evenly.
  * We were able to meet with our client and the professor to discuss our progess on the project.
  * We were able to make significant progess in our project.
 
Here's what we'd like to improve:
   * Meet with each other more often to work on the project.
   * Get feedback from client earlier to make any relevant changes.
   * Integrate functionality into our project
  
Here are changes we plan to implement in the next sprint:
   * Start testing our project using Continous Integration.
   * Meet with the client to discuss the project further.
   * Wrap up our project as a rough draft to then improve and finalize later.
