const router = require('express').Router();
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');
const {isAuth, isGuest} = require ('../middlewares/authMiddleware')

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest,  async(req, res) => {
    try {
        let { fullname, username, password, repass } = req.body;
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

router.get('/login', isGuest,  (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
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

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_COOKIE);
    res.redirect('/');
});


module.exports = router;
