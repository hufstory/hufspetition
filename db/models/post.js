const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
var Schema = mongoose.Schema;

var post = new Schema(
    {
        postID: Number,       //KEY
        creatorID: Number,    //글쓴이 AccountID
        Title: String,        //제목
        postDetail: String,   //글 내용
        AgreeCount: Number,   //동의
        DisagreeCount: Number, //비동의 사용할지 모르겠지만 그냥 넣었습니다..
    }
)

var post_model = mongoose.model('post', post);

module.exports = post_model;