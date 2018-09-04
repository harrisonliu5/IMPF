var fs = require('fs');
var data = fs.readFile('data.txt',function(err, data){
    if(err){
        return console.error(err);
    }
    console.log(data.toString());
});

console.log('程序执行完毕');
