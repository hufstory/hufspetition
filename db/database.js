/*
Prototyping용도로 남김.
아직은 MongoDB<->서버 헨들러를 구성하지 않았기때문에 ㅠㅠ.. 
*/

//mongoose 모듈을 불러오기
var mongoose = require('mongoose');

//데이터베이스 모델 불러오기
var account = require('./models/account');
var community_post = require('./models/community_post');
var post = require('./models/post');

//db connection
var mongoDB = 'mongodb://127.0.0.1/hufs_vote'; //hufs_vote 데이터베이스 불러오기
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('성공적으로 데이터베이스에게 연결되었습니다!'))
.catch((err) => console.log("오류가 생겼습니다. 오류:"+err));

//default connection 불러오기
var db = mongoose.connection;

module.exports = db;