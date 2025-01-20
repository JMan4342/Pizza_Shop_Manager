const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const server = require("http").Server(app);

// Serve only the static files form the angularapp directory
// app.use(express.static(__dirname + "/client/dist/browser/pizza-shop-manager"));
app.use(express.static("/client/dist/browser/pizza-shop-manager"));

app.get("/*", function (req, res) {
  res.sendFile(
    // path.join(__dirname + "/client/dist/browser/pizza-shop-manager/index.html")
    path.join("/client/dist/browser/pizza-shop-manager/index.html")
  );
});

// Start the app by listening on the default Heroku port

server.listen(port, function () {
  console.log("App running on port " + port);
});
