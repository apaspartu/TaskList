const express = require('express');
const router = express.Router();

const {
    showSignIn,
    showSignUp,
    handleSignInCredentials,
    handleSignUpCredentials
} = require('../controllers/auth_controllers.js');

router.get('/sign-in', showSignIn);
router.post('/sign-in', handleSignInCredentials);

router.get('/sign-up', showSignUp);
router.post('/sign-up', handleSignUpCredentials);

module.exports = router;
