const express = require('express');
const router = express.Router();
const cPostTemplate = require('../../db/models/community_post'); //자유게시판 데이터 베이스 모델

router.get('/', function(req, res, next) {
    res.send('community post');
  });

  //청원 글 만들기
  router.post('/create', function(req, res, next)
  {

  });

  //청원 글 불러오기
  router.post('/read', function(req, res, next)
  {

  });

  //청원 글 삭제 요청
  router.post('/delete', function(req, res, next)
  {

  });

module.exports = router;