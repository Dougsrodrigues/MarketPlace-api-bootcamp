const nodemailer = require("nodemailer"); // modulo para mandar e-mail
const path = require("path");
//View engine para mandar o email
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

const mailConfig = require("../../config/mail");

const transport = nodemailer.createTransport(mailConfig);

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, "..", "views", "emails"),
    extName: ".hbs"
  })
);

module.exports = transport;
