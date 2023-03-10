var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/', usersCtrl.index);

router.get('/:userid', usersCtrl.show);

router.get('/:userid/invite', usersCtrl.new);

router.post('/:userid/messages/:msgid', usersCtrl.delete);

router.post('/:userid', usersCtrl.create);

router.post('/:userid/invite/:tapid', usersCtrl.invite);

module.exports = router;