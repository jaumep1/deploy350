const getCurrentUser = (req, res) => {
  const {
    email, name, role, _id,
  } = req.session;
  if (email === undefined) {
    res.status(404).send('no user logged in');
  } else {
    res.status(201).send({
      email, name, role, _id,
    });
  }
};

const utilityRoutes = {
  getCurrentUser,
};

module.exports = utilityRoutes;
