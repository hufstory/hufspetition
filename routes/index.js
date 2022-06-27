var express = require('express');
var router = express.Router();

/* GET home page. 임시 홈페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '한국외국어대학교 Voting Site 환영합니다!' });
});

module.exports = router;
