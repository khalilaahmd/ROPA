// Home Page

const router = require('express').Router();

router.get('/', (req, res, next) => res.render('HomePage'))
module.exports = router;