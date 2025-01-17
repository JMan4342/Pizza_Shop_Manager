import * as mongodb from "mongodb";
import { Pizza } from "./pizza";
import { Topping } from "./topping";

export const collections: {
    pizzas? : mongodb.Collection<Pizza>;
    toppings? : mongodb.Collection<Topping>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("pizzaShopManager");
    await applySchemaValidation(db);

    const pizzasCollection = db.collection<Pizza>("pizzas");
    collections.pizzas = pizzasCollection;

    const toppingsCollection = db.collection<Topping>("toppings");
    collections.toppings = toppingsCollection;
}

function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string"
                },
                toppings: {
                    bsonType: "string",
                    description: "'toppings' is optional but, if used, must be a string."
                },
            },
        },
    }
}

