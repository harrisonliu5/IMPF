var express = require('express');
var app = express();

app.get('/index/:id', function (req, res) {
    // res.send('Hello 【'+ req.params.id + '】');
    // res.json({
    //     success:true,
    //     data:{
    //         message: 'hello'
    //     }
    // });
})

var server = app.listen(8000, function () {
    console.log("开始启动")

})