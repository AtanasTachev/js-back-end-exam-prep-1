const express = require('express');
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');

const router = express.Router();

corouter.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register',  async(req, res) => {
    try {
        let { fullname, username, password, repass } = req.body;
        // console.log(req.body);
        if(password === repass) {
            await authService.register(fullname, username, password, repass);

            let token = await authService.login(username, password);
            
            res.cookie(TOKEN_COOKIE, token, {
                httpOnly: true
            });

            res.redirect('/');
        }

    } catch (err) {
        res.status(400).render('auth/register', {err: err.message})
    }

});

router.get('/login',  (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
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
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_COOKIE);
    res.redirect('/');
});


module.exports = router;
