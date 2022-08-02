//모듈 불러오기
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet'); //웹해킹 방지하는 모듈추가..

//router(callback)
const indexRouter = require('./routes/index');              // Index
const usersRouter = require('./routes/login/users');              // 유저페이지
const loginRouter = require('./routes/login/login');              // 로그인
const registerRouter = require('./routes/login/register');        // 회원가입
const petitionRouter = require('./routes/petition/petition');        // 청원 관련 Routes
const cPostsRouter = require('./routes/free/free');   // 자유게시판 Routes
const noticeRouter = require('./routes/notice/notice');            // 공지사항 Routes

//데이터베이스
const db          = require('./db/database');

// Create Express application
const app = express();

//Use Helmet for protection purposes.
app.use(helmet());

//Middleware
app.use(session({
  secret: '해커들이절대때로때로로알아내지못할키', //키
  resave: true,
  saveUninitialized : false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set web application to use Routers.
app.use('/', indexRouter);                 // Index
app.use('/users', usersRouter);            // 유저페이지
app.use('/login', loginRouter);            // 로그인
app.use('/register', registerRouter);      // 회원가입
app.use('/petition', petitionRouter);      // 청원 관련 Routes
app.use('/free', cPostsRouter); // 자유게시판 Routes
app.use('/notice', noticeRouter);          // 공지사항 Routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
