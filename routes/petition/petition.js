const express = require('express');
const router = express.Router();
const petitionTemplate = require('../../db/models/petition');

router.get('/', function(req, res, next) {
    res.send('test petition');
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