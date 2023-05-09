const db = require('./database');

const checkoutOrder = async (req, res) => {
  try {
    const { cart, data } = req.body;
    const result = await db.checkoutOrder(cart, data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const analyticsRoutes = {
  checkoutOrder,
};

module.exports = analyticsRoutes;
