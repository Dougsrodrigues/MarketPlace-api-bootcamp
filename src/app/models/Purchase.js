const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const PurchaseSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});

PurchaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Purchase", PurchaseSchema);
