const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
const Schema = mongoose.Schema;

const community_post = new Schema(
    {
        creatorID: { //글쓴이 AccountID(_id)
            type: String, 
            maxLength: [25, '일어날수없는 오류! 해킹방지'],
            required: [true, "필수 항목입니다!"]
        },    
        creatorName: { //표시될 글쓴이 이름
            type: String,
            minLength: [2, '최소한 2자 이상 입력해주세여!'],
            maxLength: [12, '최대가 12자입니다!'],
            required: [true, "필수 항목입니다!"]
        },  
        Title: { //제목
            type: String,
            minLength: [4, '최소한 4자 이상 입력해주세여!'],
            maxLength: [50, '최대가 50자입니다!'],
            required: [true, "필수 항목입니다!"]
        },        
        postDetail: { //글 내용
            type: String,
            minLength: [50, '최소한 50자 이상 입력해주세여!'], 
            maxLength: [500, '최대가 500자입니다!'],
            required: [true, "필수 항목입니다!"]
        },   
        AgreeCount: { //동의
            type: Number,
            default: 1
        },
        //CommentCount: {Type: Number, default: Comments.length}, //의미없기때문에 우선 주석처리

        //커뮤니티 글에서 뎃글 오브젝트
        Comments: [{   //_id로 활용
                    accountID: { //글쓴이 AccountID(_id)
                        type: String, 
                        maxLength: [25, '일어날수없는 오류! 해킹방지'],
                        required: [true, "필수 항목입니다!"]
                    }, //계정에 comment를 연동(_id)
                    commentDetails: { 
                        type: String,
                        maxLength: [500, '최대가 500자입니다!'],
                        required: [true, "필수 항목입니다!"]
                    }, //뎃글 내용
                    commentLike:{
                        type: Number,
                        default : 0
                    }
                  }]
    }
)

const community_post_model = mongoose.model('community_post', community_post);

module.exports = community_post_model;