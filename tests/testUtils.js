/* eslint-disable no-console */
/**
 * utility functions for testing
 */

const insertUserTestDataToDB = async (db, testData) => {
  const result = await db.collection('Users').insertOne(testData);
  return result.insertedId;
};

const deleteUserTestDataFromDB = async (db, testData) => {
  try {
    const result = await db.collection('Users').deleteMany({ _id: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'success delete');
    } else {
      console.log('warning', 'unsuccessful delete');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

const insertSettingsTestDataToDB = async (db, testData) => {
  const result = await db.collection('UserSettings').insertOne(testData);
  return result.insertedId;
};

const deleteSettingsTestDataFromDB = async (db, testData) => {
  try {
    const result = await db.collection('UserSettings').deleteMany({ _id: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'success delete');
    } else {
      console.log('warning', 'unsuccessful delete');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

// export the functions
module.exports = {
  insertUserTestDataToDB,
  deleteUserTestDataFromDB,
  insertSettingsTestDataToDB,
  deleteSettingsTestDataFromDB,
};
