const express = require('express');
const router = express.Router();
const accountTemplate = require('../../db/models/account');
const petitionTemplate = require('../../db/models/petition');

router.get('/', function(req, res, next) {
    res.send('여기에서 청원 POST요청 보내주세여!'); //정식 출시때 없애도록
  });

  //청원 글 만들기
  router.post('/create', async(req, res, next) =>
  {
    await accountTemplate.findById(req.session.AccID)
    .then(
      (user)=>{
        if(!user) //만약에 세션에 저장된 계정 고유번호가 존재하지 않다면 오류 출력
        {
          res.status(401).json({
            error: '세션 오류. 다시 로그인해주세요!'
        });          
        }
        else //찾았다면 API가 받은 정보 기반으로 새로운 청원 글 만들기
        {
          const createPetitionPost = new petitionTemplate(
            {
              creatorID: req.session.AccID, //고유 계정 번호 기준으로 데이터베이스에서 저장함
              creatorName: req.body.nickName, //청원 글쓴이 표시될 이름
              Title: req.body.petitionTitle, //청원 글의 제목
              postDetail: req.body.petitionBody //청원 글 내용
            }
          )
          createPetitionPost.save() //데이터베이스에 청원 글을 저장한다
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
          console.log(error); //디버깅용도

          res.status(401).json ({
            message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관리자 문의주십시오!"
          });     
      }
    )
  });

  //청원 글 불러오기
  router.post('/read', async(req, res, next) =>
  {
    await petitionTemplate.findById(req.body.petitionID)
    .then(
      (post)=>{
        if(!post)
        {
          res.status(401).json ({
            error: '요청하신 청원 글이 존재하지 않습니다!'
          });          
        }
        else
        {
          //json 포멧으로 보내기
          res.status(200).json ({
          creatorID: post.creatorName, //글쓴이 고유 계정 번호
          PetitionTitle: post.Title,
          PetitionDetail: post.postDetail,
          AgreeCount: post.AgreeCount 
          });
        }
      }
    )
    .catch(
      (error)=>{
          console.log(error); //디버깅용도

          res.status(401).json ({
            message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관리자 문의주십시오!"
          }); 
      }
    )
  });

  //청원 글 동의합니다 요청!
  router.post('/agree', async(req, res, next) => //아직 미완성!!!
  {
    await petitionTemplate.findById(req.body.petitionID)
    .then(
      (post)=>{
        if(!post)
        {
          res.status(401).json ({
            error: '요청하신 청원 글이 존재하지 않습니다!'
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
          console.log(error); //디버깅용도

          res.status(401).json ({
            message: "불러오기 실패! 같은 현상이 계속 일어나면 사이트 관리자 문의주십시오!"
          });     
      }
    )
  });

  //청원 글 삭제 요청
  router.post('/delete', async(req, res, next) =>
  {
    await petitionTemplate.findByIdAndDelete(req.body.petitionID); //나중에 조금 더 구체적으로 만들도록
  });

module.exports = router;