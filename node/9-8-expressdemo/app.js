var express = require('express');
var app = express();
// 引入mysql链接
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harrison'
});
connection.connect();

//配置swig
var swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index');
})

app.get('/submit', function (req, res) {
    var post = { username: req.query.username };
    console.log(req.query.username);
    var query = connection.query('INSERT INTO userInfo SET ?', post, function (error, results, fields) {
        if (error) {
            res.status(500);
            res.send({
                success: 'false',
                msg: '提交失败'
            })
        }else{
            res.status(200);
            res.send({
                success: 'true',
                msg: '提交成功'
            });
        }
      
    });
});


// 容错机制
app.get('*',function(req,res){
    res.status(404);
    res.end('404');
})

app.use(function(err, req, res, next){
    res.status(500);
    res.end('500');
});

app.listen(3000,function(){
    console.log('start server');
});

