const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const PurchaseSchema = new mongoose.Schema({
  adId: {
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
  },
  statusSold: {
    type: Boolean,
    required: false,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PurchaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Purchase", PurchaseSchema);
