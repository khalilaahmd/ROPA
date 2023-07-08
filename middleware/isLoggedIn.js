// module.exports = (req, res, next) => {
//     // check if the user is logged in when trying to access a specific page
//     if (!req.session.currentUser) {
//         return res.redirect('/auth/login');
//     }
//     next();
// };