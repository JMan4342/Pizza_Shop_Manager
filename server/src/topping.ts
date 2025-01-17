import * as mongodb from "mongodb";

export interface Topping {
    _Id: mongodb.ObjectId;
    ToppingName: string;
}