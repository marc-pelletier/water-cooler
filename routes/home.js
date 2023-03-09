var express = require('express');
var router = express.Router();
const homeCtrl = require('../controllers/home');


router.get('/', homeCtrl.index);

router.get('/new', homeCtrl.new);

router.get('/:tapid/channels/new', homeCtrl.newChannel);

router.get('/:tapid', homeCtrl.show);

router.get('/:tapid/channels/:chanid', homeCtrl.showChannel);

router.post('/:tapid/channels/:chanid/messages/:msgid', homeCtrl.delete);

router.post('/:tapid/channels/:chanid', homeCtrl.createMessage);

router.post('/:tapid', homeCtrl.createChannel);

router.post('/', homeCtrl.create);

module.exports = router;