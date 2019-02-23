const Mail = require("../services/Mail");

class PurcasheMail {
  get key() {
    return "PurchaseMail";
  }

  async handle(job, done) {
    const { ad, user, content } = job.data;
    await Mail.sendMail({
      from: '"Douglas Santiago" <dougsrodrigues@outlook.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: "purchase",
      context: { user, content, ad: ad }
    });
    return done();
  }
}

module.exports = new PurcasheMail();
