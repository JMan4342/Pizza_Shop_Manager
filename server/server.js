// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();
// const path = require("path");
// const port = process.env.PORT || 8080;
// const server = require("http").Server(app);

// const { ATLAS_URI } = process.env;

// mongoose
//   .connect(ATLAS_URI)
//   .then(() => console.log("Connected to MongoDB"));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, PUT, GET");
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Serve only the static files form the angularapp directory
// // app.use(express.static("client/dist/pizza-shop-manager/browser"));
// app.use(
//   express.static(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser")
//   )
// );
// // app.use(
// //   express.static(path.join(__dirname, "../client/dist/pizza-shop-manager/server"))
// // );

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser/index.html")
//   );
//   // res.sendFile(
//   //   path.join(
//   //     __dirname,
//   //     "../client/dist/pizza-shop-manager/server/index.server.html"
//   //   )
//   // );
// });

// // Start the app by listening on the default Heroku port

// server.listen(port, function () {
//   console.log("App running on port " + port);
// });

// // mongodb.MongoClient.connect(process.env.MONGODB_URI || "http://localhost:5200", function (err, client) {
// //   if (err) {
// //     console.log(err);
// //     process.exit(1);
// //   }

// //   db = client.db();
// //   console.log("Database connection ready");

// //   var server = app.listen(process.env.PORT || 8080, function () {
// //     var port = server.address().port;
// //     console.log("App now running on port", port);
// //   });
// // });

// *** START OF NEW SERVER/DATABASE CODE ***
// var express = require('express'); // ExperssJS Framework
// var app = express(); // Invoke express to variable for use in application
// var port = process.env.PORT || 8080; // Set default port or assign a port in enviornment
// var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
// var bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
// var router = express.Router(); // Invoke the Express Router
// var pizzaRoutes = require('./routes/pizzas'); // Import the application end points/API
// var toppingRoutes = require('./routes/pizzas');
// var path = require('path'); // Import path module
// // var database = require('/src/database');

// app.use(bodyParser.json()); // Body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// app.use(express.static(__dirname + '../client/dist/pizza-shop-manager/browser')); // Allow front end to access public folder
// app.use('/api/pizzas', pizzaRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )
// app.use('/api/topping', toppingRoutes);

// //
// // <---------- REPLACE WITH YOUR MONGOOSE CONFIGURATION ---------->
// //
// const { ATLAS_URI } = process.env;
// mongoose.connect(ATLAS_URI, function(err) {
//     if (err) {
//         console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
//     } else {
//         console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
//     }
// });
// // database.connectToDatabase(ATLAS_URI)
// //   .then(() => {
// //     const port = process.env['PORT'] || 5200;
// //     const app = express();
// //     app.use(cors());

// //     app.use("/api/pizzas", pizzaRoutes);
// //     app.use("/api/toppings", toppingRoutes);

// //     app.listen(port, () => {
// //       console.log(`Server running on PORT ${port}`);
// //     });
// //   })
// //   .catch((error) => console.log(error));

// // Set Application Static Layout
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '../client/dist/pizza-shop-manager/browser/index.html')); // Set index.html as layout
// });

// // Start Server
// app.listen(port, function() {
//     console.log('Running the server on port ' + port); // Listen on configured port
// });

// *** START NEXT NEW SERVER CODE 02/01/2025 9:20AM ***
// var dotenv = require("dotenv");
// var express = require("express");
// var MongoClient = require("mongodb").MongoClient;
// var mongodb = require("mongodb");
// var mongoose = require("mongoose");
// var cors = require("cors");
// var bodyParser = require("body-parser");
// var port = process.env.PORT || 8080;
// const server = require("http").Server(app);

// var pizzaRoutes = require("./routes/pizzas"); // Import the application end points/API
// var toppingRoutes = require("./routes/toppings");

// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// const { ATLAS_URI } = process.env;

// if (!ATLAS_URI) {
//   console.error(
//     "No ATLAS_URI environment variable has been defined in config.env"
//   );
//   process.exit(1);
// }

// mongoose.connect(ATLAS_URI).then(() =>
//   console.log("Connected to MongoDB")
// );

// var app = express();
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // app.use("/api/pizzas", pizzaRoutes);
// // app.use("/api/toppings", toppingRoutes);

// var DATABASENAME = "pizzaShopManager";
// var database;

// server.listen(port, function () {
//   console.log("App running on port " + port);
// });

// // const client = new mongodb.MongoClient(ATLAS_URI);
// // await client.connect();

// // const db = client.db("pizzaShopManager");

// // app.listen(port, () => {
// //   console.log("MongoDB Connection Successful");
// //   console.log(`Server running on PORT ${port}`);
// // });

// // app.use("/api/pizzas", pizzaRoutes);
// // app.use("/api/toppings", toppingRoutes);

// // app.listen(port, () => {
// //   const client = new mongodb.MongoClient(ATLAS_URI);
// //   client.connect();
// //   var db = client.db("pizzaShopManager");
// //   console.log("MongoDB Connection Successful");
// //   console.log(`Server running on PORT ${port}`);
// //   // new MongoClient(ATLAS_URI, (error, client) => {
// //   //   database = client.db(DATABASENAME);
// //   //   console.log("MongoDB Connection Successful");
// //   // });
// // });

// *** START NEW SERVER CODE 2/3/2025 @ 11:40AM ***
var dotenv = require("dotenv");
const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
var port = process.env.PORT || 8080;
var pizzaRoutes = require("./routes/pizzas"); // Import the application end points/API
var toppingRoutes = require("./routes/toppings");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static(
    path.join(__dirname, "../client/dist/pizza-shop-manager/browser")
  )
);
// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser/index.html")
//   );
//   res.sendFile(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser/pizzas/index.html")
//   );
//   res.sendFile(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser/toppings/index.html")
//   );

// });

app.use("/api/pizzas", pizzaRoutes);
app.use("/api/toppings", toppingRoutes);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

// const { ATLAS_URI } = process.env.ATLAS_URI;
// const ATLAS_URI = "mongodb+srv://manningjoseph4342:kEW1sXNLtwgFhAJj@cluster0.a92ji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(ATLAS_URI);
const DB_NAME = "pizzaShopManager";
const COLLECTION = "pizzas";

app.listen(port, () => {
  console.log("Server is listening", port);
  client.connect();
  client.db(DB_NAME);
  console.log("Connection successfully established", DB_NAME);
});

// app.get("/api/pizzas", async (_req, res) => {
//   await client.connect();
//   try {
//     const pizzas = await client
//       .db(DB_NAME)
//       .collection(COLLECTION)
//       .find({})
//       .toArray();
//     res.status(200).send(pizzas);
//   } catch (error) {
//     res
//       .status(500)
//       .send(error instanceof Error ? error.message : "Unknown error");
//   } finally {
//     await client.close();
//   }
// });
