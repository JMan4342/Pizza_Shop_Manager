var dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const Pizza = require("../models/pizza");

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
const COLLECTION = "pizzas";

const pizzaCollection = client.db(DB_NAME).collection(COLLECTION);

// mongodb.MongoClient.connect(ATLAS_URI, (error, client) => {
//     db = client.db("pizzaShopManager");
//     pizzaCollection = db.collection("pizzas");
// })

// const client = new mongodb.MongoClient(ATLAS_URI);
// client.connect();

// const db = client.db("pizzaShopManager");
// const pizzaCollection = db.collection("pizzas");

const pizzaRouter = express.Router();
pizzaRouter.use(express.json());
pizzaRouter.use(express.urlencoded({ extended: true }));

pizzaRouter.get("/getPizzas", async (_req, res) => {
  //   try {
  //     const pizzas = await pizzaCollection.find({}).toArray();
  //     res.status(200).send(pizzas);
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .send(error instanceof Error ? error.message : "Unknown error");
  //   }
  //   await client.connect();
  try {
    const pizzas = await pizzaCollection.find({}).toArray();
    res.status(200).send(pizzas);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
  //   finally {
  //     await client.close();
  //   }
});

pizzaRouter.get("/getPizza/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const pizza = await pizzaCollection.findOne(query);

    if (pizza) {
      res.status(200).send(pizza);
    } else {
      res.status(404).send(`Failed to find a pizza: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a pizza: ID ${req?.params?.id}`);
  }
});

pizzaRouter.post("/addPizza", async (req, res) => {
  try {
    const pizza = req.body;
    const result = await pizzaCollection.insertOne(pizza);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new pizza: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new pizza.");
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

pizzaRouter.put("/updatePizza/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const pizza = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await pizzaCollection.updateOne(query, { $set: pizza });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated a pizza: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find a pizza: ID ${id}.`);
    } else {
      res.status(304).send(`Failed to update a pizza: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

pizzaRouter.delete("/deletePizza/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await pizzaCollection.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an pizza: ID ${id}.`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a pizza: ID ${id}.`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a pizza: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

module.exports = pizzaRouter;
