const express = require('express');
const router = express.Router();

/* GET users listing. */
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
