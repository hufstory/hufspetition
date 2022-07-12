const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //암호화용 모듈
const accountTemplate = require('../../db/models/account');

//일단 Client Side Rendering이라고 가정하고 서버 API만 만들겠습니다 - 정현
router.post('/authenticate', async(req, res)=>
{

    if(req.body.username.length === 0 || req.body.password.length === 0)
    {
        res.status(401).json({
            error: '아이디나 비밀번호 입력하시길 바랍니다!'
        });
    }
    else
    {
        await accountTemplate.findOne({ email: req.body.username })
        .then(
            (user) => {
                if(!user) {
                    res.status(401).json({
                        error: '이메일이 존재하지 않거나 입력 재대로 하지않으셨습니다.'
                    });
                }
    
                bcrypt.compare(req.body.password, user.password).then(
                    (passValid) => {
                        if(!passValid) {
                            res.status(401).json({
                                error: '비밀번호가 알맞지 않습니다!'
                            });
                        }
                        else
                        {
                            //세션 쿠기만들기
                            req.session.loggedin = true;
                            req.session.AccID = user._id;
    
                            //json 포멧으로 보내기
                            res.status(200).json({
                                accountID: user._id, //디버깅 용도이다. 나중에 없애도록
                                username: user.email,
                                message: '성공적으로 로그인을 하셨습니다!'
                            });
    
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                        
                        res.status(500).json({
                          error: error
                        });
                      }
                );
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }



})




module.exports = router;