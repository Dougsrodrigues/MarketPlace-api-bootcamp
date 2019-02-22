const express = require("express");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");

routes.post("/users", controllers.UserController.store);
routes.post("/session", controllers.SessionController.store);

routes.use(authMiddleware); // todas as rotas daq pra baixo vão ser autenticadas

// Ads
routes.get("/ads", controllers.AdController.index);
routes.get("/ads/:id", controllers.AdController.show);
routes.post("/ads", controllers.AdController.store);
routes.put("/ads/:id", controllers.AdController.update);
routes.delete("/ads/:id", controllers.AdController.destroy);

//Purchases
routes.post("/purchases", controllers.PurchaseController.store);

module.exports = routes;
