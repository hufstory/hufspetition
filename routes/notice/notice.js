const express = require('express');
const router = express.Router();
const noticeTemplate = require('../../db/models/notice');

router.get('/', function(req, res, next) {
    res.send('test notice');
  });

    //공지사항 글 만들기
    router.post('/create', function(req, res, next)
    {
  
    });
  
    //공지사항 글 불러오기
    router.post('/send', function(req, res, next)
    {
  
    });

module.exports = router;