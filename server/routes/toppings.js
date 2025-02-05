var dotenv = require("dotenv");
const express = require("express");
// const mongodb = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Topping = require("../models/topping");
// const { Topping } = mongoose.model("Topping", ToppingSchema);

// const toppingSchema = new mongoose.Schema({
//   _id: ObjectId,
//   toppingName: String,
// });
// const Topping = mongoose.model('Topping', toppingSchema)
// const toppingCollection = new mongodb.Collection("toppings");

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

const client = new MongoClient(ATLAS_URI);
const DB_NAME = "pizzaShopManager";
const COLLECTION = "toppings";
const toppingCollection = client.db(DB_NAME).collection(COLLECTION);

// mongodb.MongoClient.connect(ATLAS_URI, (error, client) => {
//     db = client.db("pizzaShopManager");
//     toppingCollection = db.collection("toppings");
// });

// const toppingCollection = db.collection("toppings");

const toppingRouter = express.Router();
toppingRouter.use(express.json());
// toppingRouter.use(bodyParser.json());

toppingRouter.get("/getToppings", async (req, res) => {
  try {
    const toppings = await toppingCollection.find({}).toArray();
    res.status(200).send(toppings);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

toppingRouter.get("/getTopping/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const topping = await toppingCollection.findOne(query);

    if (topping) {
      res.status(200).send(topping);
    } else {
      res.status(404).send(`Failed to find a topping: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a topping: ID ${req?.params?.id}`);
  }
});

toppingRouter.post("/addTopping", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const topping = new Topping();
    topping.toppingName = req.body.toppingName;
    console.log("new topping", topping);
    const result = await toppingCollection.insertOne(topping);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new topping: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new topping.");
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

toppingRouter.put("/updateTopping/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const topping = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await toppingCollection.updateOne(query, { $set: topping });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated a topping: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find a topping: ID ${id}.`);
    } else {
      res.status(304).send(`Failed to update a topping: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

toppingRouter.delete("/deleteTopping/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await toppingCollection.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}.`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a topping: ID ${id}.`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a topping: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

module.exports = toppingRouter;
