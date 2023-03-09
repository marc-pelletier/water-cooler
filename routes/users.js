var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.index);

router.get('/:userid/invite', usersCtrl.new);

router.post('/:userid/invite/:tapid', usersCtrl.create);

module.exports = router;