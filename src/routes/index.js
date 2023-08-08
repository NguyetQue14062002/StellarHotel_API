import auth from './auth.router.js';

const initRoutes = (app) => {
    app.use('/api/auth', auth);
}

module.exports = initRoutes;