const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");

const ToppingSchema = new mongoose.Schema ({
  _Id: {
    type: mongodb.ObjectId,
    required: true
  },
  toppingName: {
    type: String,
  },
});

module.exports = mongoose.model('Topping', ToppingSchema);