const express = require('express');
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');

const router = express.Router();

const renderRegisterView = (req, res) => {
    res.render('auth/register');
}

const register = async(req, res) => {
    try {
        let { fullname, username, password, repass } = req.body;
        // console.log(req.body);
        if(password === repass) {
            await authService.register(fullname, username, password, repass);
            res.redirect('/');
        }

    } catch (err) {
        res.status(400).render('auth/register', {err: err.message})
    }

};

const renderLoginView = (req, res) => {
    res.render('auth/login');
};

const login = async (req, res) => {
    const { username, password } = req.body;
 
        let user = await authService.login(username, password);
    
        if(!user) {
            return res.redirect('/404');
        }
        let token = await authService.createToken(user);
    
        res.cookie(TOKEN_COOKIE, token, {
            httpOnly: true
        });
    
        res.redirect('/');

};

let logout = (req, res) => {
    res.clearCookie(TOKEN_COOKIE);
    res.redirect('/');
};


router.get('/register', renderRegisterView);
router.post('/register', register);
router.get('/login', renderLoginView);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
