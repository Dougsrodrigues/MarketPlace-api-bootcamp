const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Fazendo a criptografia da senha, se ela n tiver sido alterada , n é feito nenhuma criptografia.
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

//Metodo q Compara se a senha recebida é igual a senha criptografada que esta salva no bd
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};
//Metodo q Gera o token
UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });
  }
};

module.exports = mongoose.model("User", UserSchema);
