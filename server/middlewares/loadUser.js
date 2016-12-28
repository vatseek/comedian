import User from '../models/user'

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user).then(
        user => {
            if (!user) {
                req.session.delete();
                next(new Error('Session exists but user not found'))
            }
            req.user = res.locals.user = user;
            next();
        }
    ).catch(err => {
        next(err);
    });
};