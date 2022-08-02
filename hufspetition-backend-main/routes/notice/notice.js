const express = require('express');
const router = express.Router();
const noticeTemplate = require('../../db/models/notice');
const accountTemplate = require('../../db/models/account');

router.get('/', function(req, res, next) {
    res.send('test notice');
  });

    //공지사항 글 만들기
    router.post('/create', async(req, res, next)=>
    {
      await accountTemplate.findById(req.session.AccID)
      .then(
        (user)=>{
          if(!user)
          {
            res.status(401).json({
              error : '세션 오류. 다시 로그인해 주세요!'
            });
          }
          else
          {
            const createNotice = new noticeTemplate(
              {
                creatorID : req.session.AccID,
                creatorName : req.body.nickName,
                Title : req.body.noticeTitle,
                postDetail : req.body.noticeBody
              }
            )
            createNotice.save()
            .then(data=>{
              res.json(data);
            })
            .catch(error=>{
              res.json(error);
            });
          }
        }
      )
      .catch(
        (error)=>{
          console.log(error);
          
          res.status(401).json({
            message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관리자 문의주십시오!"
          });
        }
      )
    });
  
    //공지사항 글 불러오기
    router.post('/send', async(req, res, next)=>
    {
      await noticeTemplate.findById(req.body.noticeID)
      .then(
        (post)=>{
          if(!post)
          {
            res.status(401).json({
              error: '요청하신 청원 글이 존재하지 않습니다!'
            });
          }
          else
          {
            res.status(200).json({
              creatorID : post.creatorName,
              noticeTitle: post.Title,
              noticeDetail: post.postDetail
            });
          }
        }
      )
      .catch(
        (error)=>{
          console.log(error);

          res.status(401).json({
            message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관맂 문의주십시오!"
          });
        }
      )
    });

module.exports = router;