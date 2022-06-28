const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //암호화용 모듈
const accountTemplate = require('../db/models/account');

//사용할지 모르겠지만 일단 로그 용도로 filesystem 모듈 import를했습니다
const fs = require('fs');

router.get('/', function(req, res)
{
    res.send("Login page. Please send an POST response here!");
})

//일단 Client Side Rendering이라고 가정하고 서버 API만 만들겠습니다 - 정현
router.post('/authenticate', async(req, res)=>
{
    if(req.body.username.length === 0 || req.body.password.length === 0)
    {
        res.send("이메일이랑 비밀번호 입력해주시길 바랍니다!");
        res.end();
    }

    let client_username = req.body.username;        //유저네임인데 우리는 그냥 이메일 활용하자
    let client_salt     = await bcrypt.genSalt(10); //Salt생성
    let client_password = await bcrypt.hash(req.body.password, client_salt); //데이터베이스 해쉬랑 비교할수있도록 만듦

    accountTemplate.findOne( //계정은 고유이기때문에 한번 찾으면 끝임
        {
          email: client_username, //이메일 기준으로 username을 사용하자
          password: client_password  
        },
        function(err, docs)
        {
            if(err)
            {
                fs.writeFile('./serverlog.txt', "로그인 실패했습니다. 로그 정보: "+docs);

                res.send('계정 정보가 틀렸습니다. 다시 입력하시길 바랍니다.');
            }
            else
            {
                fs.writeFile('./serverlog.txt', "로그인 성공적으로 됬습니다. 로그 정보: "+docs);
                
                req.session.loggedin = true;
                req.session.username = client_username;
                res.redirect('./index');
            }
            res.end();
        }
    )

})




module.exports = router;