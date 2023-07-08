// Department page

const router = require ('express').Router();
const Department = require ('../models/Department.model');

// GET route to display the form
router.get('/', (req, res, next) => {
Department
        .find()
        .then(allDepartments => {
            //filter method
            res.render('RoPA/Department', { departments: allDepartments})
        })
        .catch(error => {
            next(error);
        });
    });

// GET route to retrieve and display details of specific department
router.get('/:departmentName', (req, res, next) => {
    const { departmentName } = req.params;
    Department
        .findOne({ departmentName: departmentName })
        .then(theDepartment => res.render('RoPA/department-details', {departmentName: theDepartment}))
        .catch(error => {
            console.log('Error while retrieving department details: ', error);
            next(error)
        });
});

module.exports = router;