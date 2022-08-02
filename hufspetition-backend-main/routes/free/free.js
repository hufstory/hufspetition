const express = require('express');
const router = express.Router();
const accountTemplate = require('../../db/models/account');
const freeTemplate = require('../../db/models/community_post');

var count = 0;

router.get('/', function(req, res, next){
    res.send('자유게시판 post');
});

//게시판 글 만들기
router.post('/create', async(req, res, next) => 
{
    await accountTemplate.findById(req.session.AccID)
    .then(
        (user)=>{
            if(!user)
            {
                res.status(401).json({
                    error: '세션 오류. 다시 로그인해주세요!'
                });            
            }
            else
            {
                 
                const createfreePost = new freeTemplate(
                    {
                        creatorID: req.session.AccID,
                        creatorName: req.body.nickName,
                        Title: req.body.freeTitle,
                        postDetail: req.body.freeBody
                    }
                )
                createfreePost.save()
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
                message:"불러오기 실패!"
            });
        }
    )
});

//댓글만들기
router.post('/comment', async(req, res, next)=>
{
    await freeTemplate.findOne({_id: req.body.postID})
    .then(
        (user)=>{
            if(!user)
            {
                console.log(req.body.postID);
                res.status(401).json({
                    error:'세션 오류. 다시 로그인해주세요!'
                });
            }
            else
            {
                user.Comments.push({
                    accountID: req.session.AccID,
                    commentDetails: req.body.commentbody,
                    commentLike: req.body.like
                })
                user.save()
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
                message:"불러오기 실패!"
            });
        }
    )
});

//게시판 글 불러오기
router.post('/read', async(req, res, next) => 
{
    await freeTemplate.findById(req.body.freeID)
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
                    creatorID: post.creatorName,
                    freeTitle: post.Title,
                    freeDetail: post.freeDetail,
                    AgreeCount: post.AgreeCount
                });
            }
        }
    )
    .catch(
        (error)=>{
            console.log(error);
            
            res.status(401).json({
                message: "불러오기 실패!"
            });
        }
    )
});

//게시판 글 동의합니다 요청
router.post('/agree', async(req, res, next) => {
    await freeTemplate.findById(req.body.petitionID)
    .then(
        (post)=>{
            if(!post)
            {
                res.status(401).json({
                    error: '요청하신 게시판 글이 존재하지 않습니다'
                });
            }
            else
            {
                post.AgreeCount++;
                res.status(203);
            }
        }
    )
    .catch(
        (error)=>{
            console.log(error);

            res.status(401).json({
                message: "불러오기 실패! 같은 현상이 게속 일어나면 사이트 관리자 문의주세요!"
            });
        }
    )
});


//게시판 글 삭제
router.post('/delete', async(req,res,next)=>
{
    await petitionTemplate.findByIdAndDelete(req.body.po=freeID);
});

module.exports = router;