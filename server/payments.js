const User = require('./db/models/index').users;
const stripe = require('stripe')('sk_test_y1L0h0zWW6KNvLpMHi5yOKoD');

module.exports = {
  stripeCharges: (req, res) => {
    var datdestination;
    var payment_amount = Number(req.body.amount) * 100;
    User.findOne({ where: { id: req.body.chefId } })
    .then(user => {

      datdestination = user.dataValues.stripe_user_id;
    })
    const charge = stripe.charges.create({
      amount: payment_amount,
      currency: 'usd',
      source: req.body.id,
      description: 'Charge for test@example.com',
      destination: datdestination,
    }, (err, charge) => {
      // asynchronously called
      if (err && err.type === 'StripeCardError') {
        console.log('we got an err', err);
      } else {
        res.json({ message: 'your card has been successfuly charged' });
      }
    });
  },
};
