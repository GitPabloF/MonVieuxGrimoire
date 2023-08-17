# To initilisle the project, you can follow this steps: 

## 1. create a `.env` file  :

Create a `.env` file in the root directory of the project and add the following information:

```
JWT_SECRET="YOUR_SECRET_TOKEN"
DB_USERID="YOUR_MONGODB_USER_ID"
DB_PASSWORD="YOUR_MONGODB_PASSWORD"
```

- Replace `YOUR_SECRET_TOKEN` with a secret token of your choice for JWT authentication. 
- Replace `YOUR_MONGODB_USER_ID` and `YOUR_MONGODB_PASSWORD` with your actual MongoDB user credentials.

## 2. Install Dependencies and Start Frontend

Navigate to the `frontend` directory and run the following commands:
```
npm install
npm run start
```
*This will install the required dependencies and start the frontend application.*

## 3. Install Dependencies and Start Backend

Navigate to the backend directory and run the following commands:
```
npm install
nodemon server
```
*This will install the required backend dependencies and start the server.*
