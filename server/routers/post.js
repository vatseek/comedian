const express = require('express');
const router = express.Router();
import User from '../models/user'
import { HttpError } from '../errors';


router.get('/:id', function(req, res, next) {
    res.send({test: 'test'});
});

module.exports = router;