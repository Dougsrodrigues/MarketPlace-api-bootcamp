const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  //Quando o header é enviado ao backend ele vai no formato de -> Authorization: Bearer TOKEN
  //Para separa o baerer do token fazemos o split
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
