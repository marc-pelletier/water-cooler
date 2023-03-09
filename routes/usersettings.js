var express = require('express');
var router = express.Router();
const usersettingsCtrl = require('../controllers/usersettings');


router.get('/', usersettingsCtrl.index);

router.post('/update', usersettingsCtrl.update);

module.exports = router;