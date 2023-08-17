# To initilisle the project, you can follow this steps: 

## 1. create a '.env' file  :

Create a `.env` file in the root directory of the project and add the following information:

`JWT_SECRET="XXXX"` *remplace the value by the token of your choice*
`DB_USERID="XXXX"` *remplace the value by your MongoDB userID*
`DB_PASSWORD="XXXX"` *remplace the value by your MongoDB password*

## 2. Install Dependencies and Start Frontend

Navigate to the `frontend` directory and run the following commands:

`npm install`
`npm run start`
*This will install the required dependencies and start the frontend application.*

## 3. Install Dependencies and Start Backend

Navigate to the backend directory and run the following commands:

`npm install`
`nodemon server`
*This will install the required backend dependencies and start the server.*
