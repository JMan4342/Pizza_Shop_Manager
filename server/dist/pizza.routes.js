"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pizzaRouter = void 0;
const express = __importStar(require("express"));
const mongodb_1 = require("mongodb");
const database_1 = require("./database");
exports.pizzaRouter = express.Router();
exports.pizzaRouter.use(express.json());
exports.pizzaRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const pizzas = yield ((_a = database_1.collections === null || database_1.collections === void 0 ? void 0 : database_1.collections.pizzas) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        res.status(200).send(pizzas);
    }
    catch (error) {
        res
            .status(500)
            .send(error instanceof Error ? error.message : "Unknown error");
    }
}));
exports.pizzaRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const pizza = yield ((_b = database_1.collections === null || database_1.collections === void 0 ? void 0 : database_1.collections.pizzas) === null || _b === void 0 ? void 0 : _b.findOne(query));
        if (pizza) {
            res.status(200).send(pizza);
        }
        else {
            res.status(404).send(`Failed to find a pizza: ID ${id}`);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to find a pizza: ID ${(_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id}`);
    }
}));
exports.pizzaRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const pizza = req.body;
        const result = yield ((_a = database_1.collections === null || database_1.collections === void 0 ? void 0 : database_1.collections.pizzas) === null || _a === void 0 ? void 0 : _a.insertOne(pizza));
        if (result === null || result === void 0 ? void 0 : result.acknowledged) {
            res.status(201).send(`Created a new pizza: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Failed to create a new pizza.");
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .send(error instanceof Error ? error.message : "Unknown error");
    }
}));
exports.pizzaRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const pizza = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_1.collections === null || database_1.collections === void 0 ? void 0 : database_1.collections.pizzas) === null || _b === void 0 ? void 0 : _b.updateOne(query, { $set: pizza }));
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a pizza: ID ${id}.`);
        }
        else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
            res.status(404).send(`Failed to find a pizza: ID ${id}.`);
        }
        else {
            res.status(304).send(`Failed to update a pizza: ID ${id}.`);
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.log(message);
        res.status(400).send(message);
    }
}));
exports.pizzaRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_1.collections === null || database_1.collections === void 0 ? void 0 : database_1.collections.pizzas) === null || _b === void 0 ? void 0 : _b.deleteOne(query));
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an pizza: ID ${id}.`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove a pizza: ID ${id}.`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a pizza: ID ${id}.`);
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.log(message);
        res.status(400).send(message);
    }
}));
