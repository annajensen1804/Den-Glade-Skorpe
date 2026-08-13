// Server Modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Routes
import indexRouter from './routes/mcd/www/index.route.js';
import authRouter from './routes/auth/auth.js';
import authTokenRouter from './routes/auth/token.js';
import userRouter from './routes/users/user.route.js';
import usersRouter from './routes/users/users.route.js';

import * as path from 'path';
import * as url from 'url';
import dishRoute from './routes/dishes/dish.route.js';
import dishesRouter from './routes/dishes/dishes.route.js';
import messageRoute from './routes/messages/message.route.js';
import messagesRouter from './routes/messages/messages.route.js';
import orderRoute from './routes/orders/order.route.js';
import ordersRouter from './routes/orders/orders.route.js';
import ingredientsRouter from './routes/ingredients/ingredients.route.js';
import ingredientRoute from './routes/ingredients/ingredient.route.js';
import employeesRouter from './routes/employees/employees.route.js';
import employeeRoute from './routes/employees/employee.route.js';
import categoriesRouter from './routes/categories/categories.route.js';
import categoryRouter from './routes/categories/category.route.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const server = {};
const expressServer = express();

expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(cors());
expressServer.use(cookieParser());

// Serve static files from the public and www directories.
expressServer.use(express.static('[mcd]'));
expressServer.use(express.static('public'));
expressServer.use(express.static('sites'));

/*

  Routes

*/

// Index Client Frontend Routes
expressServer.use(indexRouter);

// Backend API Routes
expressServer.use(authRouter);
expressServer.use(authTokenRouter);

// Backend API Users Routes
expressServer.use(usersRouter);
expressServer.use(userRouter);

// Dishes Management
expressServer.use(dishRoute);
expressServer.use(dishesRouter);

// Messeages Route
expressServer.use(messageRoute);
expressServer.use(messagesRouter);

// Orders
expressServer.use(orderRoute);
expressServer.use(ordersRouter);

// Ingredients
expressServer.use(ingredientsRouter);
expressServer.use(ingredientRoute);

// Employees
expressServer.use(employeesRouter);
expressServer.use(employeeRoute);

// Ingredients
expressServer.use(categoriesRouter);
expressServer.use(categoryRouter);


// POC
expressServer.use(express.static(path.join(__dirname, "../sites", "poc")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "poc", "index.html"));
});

// Preview
expressServer.use(express.static(path.join(__dirname, "../sites", "preview")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "preview", "index.html"));
});

// WWW
expressServer.use(express.static(path.join(__dirname, "../sites", "www")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "www", "index.html"));
});

// Vanilla
expressServer.use(express.static(path.join(__dirname, "../sites", "vanilla")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "vanilla", "index.html"));
});

/*

  Run Server

*/
server.run = () => {

    console.log('\n\n---------------------');
    console.log('Server Started', process.env.NODE_ENV, process.env.SERVER_HOST);
    console.log('\n\n---------------------');

    expressServer.listen(process.env.SERVER_PORT, () =>
      console.log(`Running : ${process.env.SERVER_PORT}`),
    );

}


export default server;


