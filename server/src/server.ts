import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { pizzaRouter } from "./pizza.routes";
import { toppingRouter } from "./topping.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const port = process.env['PORT'] || 5200;
    const app = express();
    app.use(cors());

    app.use("/api/pizzas", pizzaRouter);
    app.use("/api/toppings", toppingRouter);

    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  })
  .catch((error) => console.log(error));
