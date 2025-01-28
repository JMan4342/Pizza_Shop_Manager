const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const server = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve only the static files form the angularapp directory
// app.use(express.static("client/dist/pizza-shop-manager/browser"));
app.use(
  express.static(path.join(__dirname, "client/dist/pizza-shop-manager/browser"))
);
app.use(
  express.static(path.join(__dirname, "client/dist/pizza-shop-manager/server"))
);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "client/dist/pizza-shop-manager/browser/index.html")
  );
  res.sendFile(
    path.join(
      __dirname,
      "client/dist/pizza-shop-manager/server/index.server.html"
    )
  );
});

// Start the app by listening on the default Heroku port

server.listen(port, function () {
  console.log("App running on port " + port);
});

// mongodb.MongoClient.connect(process.env.MONGODB_URI || "http://localhost:5200", function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   db = client.db();
//   console.log("Database connection ready");

//   var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });
