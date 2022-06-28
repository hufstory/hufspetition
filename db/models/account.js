const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        accountID: Number,
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); //hufs.ac.kr만 받도록 regex수정을 해야된다. 인터넷에있는 그냥 일반 이메일로 가져옴
                },
                message: "올바른 HUFS 학생용 이메일 입력하길 부탁드립니다."
            },
            required: [true, "HUFS 학생용 이메일 필수입니다."]
        },
        password: String, //비번은 일단 그냥 아무 string으로 하자
        SchoolID: {
            type: Number,
            validate: {
                validator: function(v) {
                    if(v.length != 9) //일단 학번 길이는 보통 20xx/xx/xxx이니..
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                },
                message: "9자리 학번 입력하시길 바랍니다."
            },
            required: [true, "학번 입력 필수입니다!"]
        },
        RegistrationDate: { type: Date, default: Date.now() },
        AccountRank: {type: Number, default: 0}, //1->운영자 0->일반 유저 -1->특별한 사유때문에 계정 정지 상태
        Ban_Reason: {type: Number, default: 0} //옆에 pseudo-code처럼 정지를 할 경우 사유도 표시되도록 만들수있다. 이거를 enum으로 할테지 아니면 그냥 database에서 string으로 할지는 팀의 결정이다..
   }
)

const accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;