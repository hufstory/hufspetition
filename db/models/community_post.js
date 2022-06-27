const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
var Schema = mongoose.Schema;

var community_post = new Schema(
    {
        postID: Number,       //KEY
        creatorID: Number,    //글쓴이 AccountID
        Title: String,        //제목
        postDetail: String,   //글 내용
        AgreeCount: Number,   //동의
        DisagreeCount: Number, //비동의 사용할지 모르겠지만 그냥 넣었습니다..
        //CommentCount: {Type: Number, default: Comments.length}, //의미없기때문에 우선 주석처리

        //커뮤니티 글에서 뎃글 오브젝트
        Comments: [{ //postID: Number,      //Non-relationship database이기 때문에.. 필요없어보이네여
                    commentID: Number,     //익명1 익명2 등등.. commentID기준으로 유저네임 만들도록!
                    accountID: Number,     //계정에 comment를 연동
                    commentDetails: String //뎃글 내용
                  }]
    }
)

var community_post_model = mongoose.model('community_post', community_post);

module.exports = community_post_model;