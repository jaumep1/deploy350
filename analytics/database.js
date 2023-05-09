const { getDB } = require('../database');

const getInventory = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('inventory').find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const getSupplies = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('SuppliesSeries').find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const getSupply = async (supplyName) => {
  try {
    const db = await getDB();
    const result = await db.collection('SuppliesSeries').find({ name: `${supplyName}` }).toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const getCategories = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('categories').find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const database = {
  getInventory,
  getSupplies,
  getSupply,
  getCategories,
};

module.exports = database;
