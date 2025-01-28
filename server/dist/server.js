"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const pizza_routes_1 = require("./pizza.routes");
const topping_routes_1 = require("./topping.routes");
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const { ATLAS_URI } = process.env;
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then(() => {
    const port = process.env['PORT'] || 5200;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use("/api/pizzas", pizza_routes_1.pizzaRouter);
    app.use("/api/toppings", topping_routes_1.toppingRouter);
    app.listen(port, () => {
        console.log(`Server running on PORT ${port}`);
    });
})
    .catch((error) => console.log(error));
