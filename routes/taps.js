var express = require('express');
var router = express.Router();
const tapsCtrl = require('../controllers/taps');


router.get('/', tapsCtrl.index);

router.post('/:tapid', tapsCtrl.joinTap);

module.exports = router;