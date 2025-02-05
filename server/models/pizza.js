const mongoose = require('mongoose');
const mongodb = require('mongodb');

const PizzaSchema = mongoose.Schema ({
  _Id: {
    type: mongodb.ObjectId,
    required: true
  },
  Toppings: {
    type: String,
  },
  PizzaName: {
    type: String,
  },
});

mongoose.model('Pizza', PizzaSchema);