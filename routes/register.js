var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt'); //암호화용 모듈
var accountTemplate = require('../db/models/account');

router.get('/', function(req, res)
{
    res.send("Register page. Please send an POST response here!");
})

router.post('/', async (req, res)=> //회원가입을 위한 POST
{
    const salt = await bcrypt.genSalt(10); //Salt 생성
    const hashPassword = await bcrypt.hash(req.body.password, salt); //암호 헤쉬하기

    const registerAcc = new accountTemplate(
        {
            accountID: req.body.accountID,
            email: req.body.email,
            password: hashPassword,
            SchoolID: req.body.SchoolID,
            RegistrationDate: req.body.RegistrationDate
        }
    )
    registerAcc.save()
    .then(data=>{
        res.json(data);
    })
    .catch(error=>{
        res.json(error);
    });
})

module.exports = router;