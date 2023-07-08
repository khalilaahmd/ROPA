// module.exports = (req, res, next) => {
//     // if already logged in user tries to access the login page -> redirect the user to the home page
//     if (!req.session.currentUser) {
//         return res.redirect('/');
//     }
//     next();
// // };