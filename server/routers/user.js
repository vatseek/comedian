const express = require('express');
const router = express.Router();

router.get('/register', function(req, res) {
    res.send({route: 'api/v1/index'});
});

module.exports = router;