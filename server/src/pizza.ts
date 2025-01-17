import * as mongodb from "mongodb";

export interface Pizza {
    _Id: mongodb.ObjectId;
    Toppings: string;
    PizzaName: string;
}