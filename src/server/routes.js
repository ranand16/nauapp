var usersRoutes = require('server/routes/user');

module.exports = function routes(app){
  app.use('/api',usersRoutes);
};
