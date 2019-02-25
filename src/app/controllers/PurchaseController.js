const Ad = require("../models/Ad");
const User = require("../models/User");
const Queue = require("../services/Queue");
const PurchaseMail = require("../jobs/PurchaseMail");
const Purchase = require("../models/Purchase");

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;
    const purchaseAd = await Ad.findById(ad).populate("author"); // procura se existe o anuncio
    const user = await User.findById(req.userId); // recuperando os dados do usuario logado

    const userId = user._id;

    //Criando a intenção de compra e salvando no mongodb
    const infPurchase = await Purchase.create({
      adId: ad,
      idUser: userId,
      content
    });
    //EMAIL
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save();

    return res.json(infPurchase);
  }

  async index(req, res) {
    const purchases = await Purchase.find();

    // const purchases = await Purchase.paginate({
    //   limit: 20,
    //   page: req.query.page || 1,
    //   sort: "-createdAt"
    // });
    return res.json(purchases);
  }

  async updateSold(req, res) {
    const purch = await Purchase.findById(req.params.id);
    const user = await User.findById(req.userId);
    const adIdUser = purch.idUser; // Id do usuario que criou o anuncio
    const userId = user.id; // id do usuario logado

    if (adIdUser == userId) {
      const purchases = await Purchase.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );
      return res.json(purchases);
    } else {
      return res.status(401).json({ error: "You're not the ad author" });
    }
  }
}

module.exports = new PurchaseController();
