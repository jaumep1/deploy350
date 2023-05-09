const db = require('./database');

const getInventory = async (req, res) => {
  try {
    const result = await db.getInventory();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSupplies = async (req, res) => {
  try {
    const result = await db.getSupplies();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSupply = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await db.getSupply(name);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await db.getCategories();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const analyticsRoutes = {
  getInventory,
  getSupplies,
  getSupply,
  getCategories,
};

module.exports = analyticsRoutes;
