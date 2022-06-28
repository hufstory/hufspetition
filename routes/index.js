const express = require('express');
const router = express.Router();

/* GET home page. 임시 홈페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '한국외국어대학교 Voting Site 환영합니다!' });
});

//전에 말씀하셨던것처럼 일단 제일 인기많은 3개 청원 정보를 보내준다
//하지만 이제 의문은 일단 알고리즘을 어떤식으로 정할지가 문제네여
//그리고 검색기능도 추가해야될텐데, 이것도 검색 알고리즘 무엇으로할지... -정현

module.exports = router;
