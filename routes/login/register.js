const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //암호화용 모듈
const accountTemplate = require('../../db/models/account');

router.post('/', async (req, res)=> //회원가입을 위한 POST
{
    const salt = await bcrypt.genSalt(10); //Salt 생성
    const hashPassword = await bcrypt.hash(req.body.password, salt); //암호 헤쉬하기

    accountTemplate.findOne({email: req.body.email})
    .then(
        (user)=>{
            if(!user)
            {
                const registerAcc = new accountTemplate(
                    {
                        email: req.body.email,
                        password: hashPassword,
                        SchoolID: req.body.SchoolID,
                    }
                )
                registerAcc.save()
                .then(data=>{
                    res.json(data);
                })
                .catch(error=>{
                    res.json(error);
                });
            }
            else
            {
                res.status(401).json({
                    error: "이미 계정가지고 계십니다!"
                });  
            }
        
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    )
})

module.exports = router;