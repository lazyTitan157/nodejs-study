var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.locals.pretty = true;
app.engine('jade', require('pug').__express);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// 정적파일 - public 폴더를 /OpenApp 경로에서 서빙
app.use('/OpenApp', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();

router.get('/', function(req, res){
  res.send('Hello home page');
});

// post 방식 입력
router.get('/form', function(req, res){
  res.render('form');
});

// post 방식입력을 get으로 출력(쿼리스트링으로 정보전송)
router.get('/form_receiver', function(req, res){
  var title = req.query.description;
  var description = req.query.description;
  res.send(title+', '+description);
});

// post방식으로 출력
router.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.textarea;
  res.send(title+', '+description);
});

//query string
router.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
  <a href="/OpenApp/topic/0">JavaScript</a><br>
  <a href="/OpenApp/topic/1">Nodejs</a><br>
  <a href="/OpenApp/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});

//URL depth 2인 경우,
router.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode);
});

router.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
});

//동적 페이지 생성 방법
router.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});

router.get('/route', function(req, res){
  res.send('Hello Router, <img src="/OpenApp/route.png">');
});

router.get('/login', function(req, res){
  res.send('<h1>Login please</h1>');
});

app.use('/OpenApp', router);

module.exports = app;
