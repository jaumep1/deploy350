/* eslint-disable no-console */
const webapp = require('./server');

const port = process.env.PORT || 3001;
webapp.listen(port, () => {
  console.log('Server running on port', port);
});
