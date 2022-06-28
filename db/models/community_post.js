const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
const Schema = mongoose.Schema;

const community_post = new Schema(
    {
        postID: Number,       //KEY
        creatorID: String,    //글쓴이 AccountID(_id)
        Title: String,        //제목
        postDetail: String,   //글 내용
        AgreeCount: Number,   //동의
        DisagreeCount: Number, //비동의 사용할지 모르겠지만 그냥 넣었습니다..
        //CommentCount: {Type: Number, default: Comments.length}, //의미없기때문에 우선 주석처리

        //커뮤니티 글에서 뎃글 오브젝트
        Comments: [{   //_id로 활용
                    accountID: String,     //계정에 comment를 연동(_id)
                    commentDetails: String //뎃글 내용
                  }]
    }
)

const community_post_model = mongoose.model('community_post', community_post);

module.exports = community_post_model;