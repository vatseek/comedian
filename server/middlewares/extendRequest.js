module.exports = function (req, res, next) {
    const contype = req.headers['content-type'];

    res.return = (data, template='', redirect=null, callback=null) => {
        if (contype === 'application/json') {
            if (callback) {
                return callback();
            }
            return res.send(data);
        } else {
            if (redirect) {
                return res.redirect(redirect);
            }
            return res.render(template, data);
        }
    };

    next();
};