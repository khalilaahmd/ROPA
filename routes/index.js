// Login Page

const router = require('express').Router();

// GET LoginPage

router.get('/', (req, res, next) => {
    console.log('req.session', req.session)
    if(req.session.currentUser){
        res.render('index', {loggedIn: req.session.currentUser});
    }
    else{
        res.render('index')
    }
});

module.exports = router;