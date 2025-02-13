const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static(
    path.join(__dirname, "./client/dist/pizza-shop-manager/browser")
  )
);
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/pizza-shop-manager/browser/index.html")
  );
});


app.listen(process.env.PORT || 8080);