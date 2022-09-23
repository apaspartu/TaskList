const crypto = require('crypto')
const validator = require('email-validator');
const user = require('../repositories/user.js');
const auth = require('../repositories/auth.js');

function validateEmail(email) {
    return validator.validate(email);
}

function validatePassword(password) {
    if (password.length > 40) {
        return false;
    }
    return true;
}

function createHash(string) {
    return crypto.createHash('sha256').update(string).digest('base64');
}

const authMiddleware = async (req, res, next) => {
// Check whether this user is logged in, else redirect to sign-in
    res.authorized = true;
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        res.authorized = false;
        res.redirect(303, '/sign-in');
    } else {
        next();
        await auth.activateUser(userid, req.ip);
    }
};


// --- SIGN IN ---
const showSignIn = async (req, res) => {
    res.render('sign-in')
};

const handleSignInCredentials = async (req, res) => {
    const password = req.body.password, email = req.body.email;
    if (!validatePassword(password)) {
        return res.render('sign-in', {errorMessage: 'Invalid password!'})
    }
    if (!validateEmail(email)) {
        return res.render('sign-in', {errorMessage: 'Invalid email!'})
    }

    const passwordHash = createHash(req.body.password);

    let profile;
    try {
        profile = await user.getProfile(email);
    } catch (e) {
        if (e.message === 'Not found!') {
            return res.render('sign-in', {errorMessage: 'Incorrect password or email!'});
        } else {
            return res.render('sign-in', {errorMessage: 'Something went wrong!'});
        }
    }

    if (profile.passwordHash !== passwordHash) {
        return res.render('sign-in', {errorMessage: 'This password does not match this email!'});
    }

    await auth.activateUser(profile._id, req.ip);
    res.cookie('userId', profile._id)
    res.redirect(303, 'tasks');
};

// --- SIGN UP ---
const showSignUp = async (req, res) => {
    res.render('sign-up')
};

const handleSignUpCredentials = async (req, res) => {
    const password = req.body.password, email = req.body.email;
    if (!validatePassword(password)) {
        return res.render('sign-up', {errorMessage: 'Invalid password! Choose another.'})
    }
    if (!validateEmail(email)) {
        return res.render('sign-up', {errorMessage: 'Invalid email! Choose another.'})
    }

    const passwordHash = createHash(req.body.password);

    let result;
    try {
        result = await user.createProfile(email, passwordHash);
    } catch (e) {
        if (e.message === 'This email is already taken.') {
            return res.render('sign-up', {errorMessage: 'This email is already taken.'})
        } else {
            return res.render('sign-up', {errorMessage: 'Something went wrong. Try again!'})
        }

    }
    if (!result) {
        return res.render('sign-up', {errorMessage: 'Something went wrong. Try again!'})
    }

    let profile;
    try {
        profile = await user.getProfile(email);
    } catch (e) {
        return res.redirect(303, 'sign-in');
    }

    await auth.activateUser(profile._id, req.ip);
    res.cookie('userId', profile._id)
    res.redirect(303, 'tasks');
};

const logOut = async (req, res) => {
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, '/sign-in');
    }
    await auth.deactivateUser(userid);
    res.clearCookie('userId')

    res.redirect(303, '/sign-in');
}

module.exports = {
    showSignIn,
    showSignUp,
    handleSignInCredentials,
    handleSignUpCredentials,
    logOut,
    authMiddleware,
};
