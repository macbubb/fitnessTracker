var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(process.cwd() + '/pages/index.html');
});

module.exports = router;
