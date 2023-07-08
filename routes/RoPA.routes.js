// RoPA page

const router = require('express').Router();

const RoPA = require ('../models/Department.model');
//*************************************************************
//              GET route to create RoPA details            **
//*************************************************************
router.get('/create', (req, res) => res.render('RoPA/RoPA'))

router.post('/create', (req, res, next) => {
    const {
        departmentName, purposeOfProcessing, legalBasis} = req.body;
    RoPA
        .create ({departmentName, purposeOfProcessing, legalBasis})
        .then(() => res.redirect('/homepage'))
        .catch(error => next (error));
});



module.exports = router;