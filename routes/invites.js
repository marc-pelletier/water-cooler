var express = require('express');
var router = express.Router();
const invitesCtrl = require('../controllers/invites');


router.get('/', invitesCtrl.index);

router.post('/:tapid', invitesCtrl.joinTap);

module.exports = router;