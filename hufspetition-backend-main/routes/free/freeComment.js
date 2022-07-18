const express = require('express');
const router = express.Router();
const accountTemplate = require('../../db/models/account');
const freeTemplate = require('../../db/models/community_post');

//자유게시판글 찾아서 댓글 작성
router.post('/create', async(req, res, next)=>{
    await accountTemplate.findById(req.body.freeID)
    .then(
        (post)=>{
            if(!post)
            {
                res.status(401).json({
                    error:'요청하신 게시판 글이 존재하지 않습니다!'
                });
            }
            else
            {
                res.status(200).json({
                    Comments : { accountID : post.AccID},
                    Comments : { commentDetails : post.postDetail}
                });    
            }
        }
    )
    .catch(
        (error)=>{
            console.log(error);

            res.status(401).json({
                message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관리자 문의주세요!"
            });
        }
    )
});

//댓글 좋아요 요청!
router.post('/agree', async(req,res,next)=>
{
    await commentTemplate.findById(req.body.commentID)
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
                //post.Comments : {commentLike++} 
            }
        }
    )
})

