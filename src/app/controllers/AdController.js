const Ad = require("../models/Ad");

class AdController {
  async index(req, res) {
    const filters = {};

    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min; //$gte = maior que
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max; //$lte = menor que
      }
    }

    if (req.query.title) {
      //o titulo n precisa ser igual a palavra que chega na query. 'i' -> tranforma a expressao em case sensitive
      filters.title = new RegExp(req.query.title, "i");
    }

    const ads = await Ad.paginate(filters, {
      limit: 20,
      populate: ["author"],
      page: req.query.page || 1,
      sort: "-createdAt"
    });
    return res.json(ads);
  }

  async show(req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }

  async store(req, res) {
    // pega todos os dados do body junto com userId do arquivo auth.js
    const ad = await Ad.create({ ...req.body, author: req.userId });

    return res.json(ad);
  }

  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(ad);
  }

  async destroy(req, res) {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdController();
