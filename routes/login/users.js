const express = require('express');
const router = express.Router();

//LOGIN API 실험용도. 나중에 없애고 다른걸로 바꾸도록합시다 - 정현
router.get('/', function(req, res, next) {
  if(req.session.loggedin)
  {
    res.send("로그인 유저: " + req.session.username);
  }
  else
  {
    res.send('로그인 되있지 않습니다.');
  }

  res.end();
});

module.exports = router;
