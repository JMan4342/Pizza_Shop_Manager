import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const toppingRouter = express.Router();
toppingRouter.use(express.json());

toppingRouter.get("/", async (_req, res) => {
  try {
    const toppings = await collections?.toppings?.find({}).toArray();
    res.status(200).send(toppings);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

toppingRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const topping = await collections?.toppings?.findOne(query);

    if (topping) {
      res.status(200).send(topping);
    } else {
      res.status(404).send(`Failed to find a topping: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a topping: ID ${req?.params?.id}`);
  }
});

toppingRouter.post("/", async (req, res) => {
  try {
    const topping = req.body;
    const result = await collections?.toppings?.insertOne(topping);

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

toppingRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const topping = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.toppings?.updateOne(query, { $set: topping });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a topping: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a topping: ID ${id}.`)
        } else {
            res.status(304).send(`Failed to update a topping: ID ${id}.`)
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.log(message);
        res.status(400).send(message);
    }
})

toppingRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.toppings?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}.`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a topping: ID ${id}.`);
        } else if (!result.deletedCount){
            res.status(404).send(`Failed to find a topping: ID ${id}.`)
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.log(message);
        res.status(400).send(message);
    }
})