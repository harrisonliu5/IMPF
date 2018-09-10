$(function(){
    $('#submit').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url:'/submit',
            type:'get',
            dataType:'json',
            data:{
                username: $('#username').val(),
            },
            success:function(data){
                console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        })
    });
});