var path = require('path');
var express = require('express');
var app = express();

app.locals.pretty = true;
app.engine('jade', require('pug').__express);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// 정적파일 - images 폴더를 /BizchoolPlatform 경로에서 서빙
app.use('/BizchoolPlatform', express.static(path.join(__dirname, 'images')));

var router = express.Router();

router.get('/', function(req, res){
  res.render('home');
});

router.get('/home', function(req, res){
  res.render('home');
});

router.get('/board', function(req, res){
  res.render('board');
});

router.get('/write', function(req, res){
  res.render('write');
});

router.get('/inus', function(req, res){
  res.render('inus');
});

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

app.use('/BizchoolPlatform', router);

module.exports = app;
