const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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


app.listen(port, () => {
    console.log('Client side port listening', port)
});