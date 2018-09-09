var express = require('express');
var app = express();
var home = require('./home');

// app.get('/index/:id', function (req, res) {
//     // res.send('Hello 【'+ req.params.id + '】');
//     res.json({
//         success:true,
//         data:{
//             message: 'hello'
//         }
//     });
// })

app.use('/home',home);

var server = app.listen(8000, function () {
    console.log("开始启动")

})