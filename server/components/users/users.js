const express = require('express');
const router = express.Router();

let signUpController = require('./controllers/signUp.server.controller.js');
let signInController = require('./controllers/signIn.server.controller.js');
let validateSessionController = require('./controllers/validateSession.server.controller.js');
let validateAdminController = require('./controllers/validateAdmin.server.controller.js');
let refreshTokenController = require('./controllers/refreshToken.server.controller.js');

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/validate-session', validateSessionController);
router.post('/validate-admin', validateAdminController);
router.post('/refresh-token', refreshTokenController);

module.exports = router;
