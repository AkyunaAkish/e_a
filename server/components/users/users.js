const express = require('express');
const router = express.Router();

let retrieveUserDataController = require('./controllers/retrieveUserData.server.controller.js');
let signUpController = require('./controllers/signUp.server.controller.js');
let signInController = require('./controllers/signIn.server.controller.js');
let validateSessionController = require('./controllers/validateSession.server.controller.js');
let validateAdminController = require('./controllers/validateAdmin.server.controller.js');
let refreshTokenController = require('./controllers/refreshToken.server.controller.js');
let updateEmailController = require('./controllers/updateEmail.server.controller.js');
let updateUsernameController = require('./controllers/updateUsername.server.controller.js');
let updatePasswordController = require('./controllers/updatePassword.server.controller.js');
let updateSecurityQuestionsAndAnswersController = require('./controllers/updateSecurityQuestionsAndAnswers.server.controller.js');

router.get('/retrieve-user-data/:email/:limit', retrieveUserDataController);
router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/validate-session', validateSessionController);
router.post('/validate-admin', validateAdminController);
router.post('/refresh-token', refreshTokenController);
router.post('/update-email', updateEmailController);
router.post('/update-username', updateUsernameController);
router.post('/update-password', updatePasswordController);
router.post('/update-security-questions-and-answers', updateSecurityQuestionsAndAnswersController);

module.exports = router;
