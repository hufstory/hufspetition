const { default: mongoose, mongo } = require("mongoose");

//Schema를 정의!
var Schema = mongoose.Schema;

var accountSchema = new Schema(
    {
        accountID: Number,
        email: String,
        password: String,
        SchoolID: Number,
        RegistrationDate: Date,
        AccountRank: {type: Number, default: 0}, //1->운영자 0->일반 유저 -1->특별한 사유때문에 계정 정지 상태
        Ban_Reason: {type: Number, default: 0} //옆에 pseudo-code처럼 정지를 할 경우 사유도 표시되도록 만들수있다. 이거를 enum으로 할테지 아니면 그냥 database에서 string으로 할지는 팀의 결정이다..
   }
)

var accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;