var light=require("ueklight");
var router=light.Router();
var mysql=require('./mysql');
var md5=require('./md5.js');
router.get("/",function(req,res){
    res.render("index.html",{name:"root"});
});
router.get("/fetch",function (req,res) {
    setTimeout(function(){
        mysql.query("select * from app",function (err,result) {
            if(err){
                res.send()
            }else{
                res.send(JSON.stringify(result))
            }
        })
    },1000)
});
router.get("/addcon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    setTimeout(function(){
        mysql.query(`insert into app (name,age,sex) values ('${name}','${age}','${sex}')`,function (err,result) {
            if(err){
                res.send('err')
            }else{
                if(result.affectedRows>0){
                    res.send('ok')
                }else{
                    res.send("err");
                }
            }
        })
    },1000)
})
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    setTimeout(function(){
        mysql.query("delete from app where id="+id,function (err,result) {
            if(err){
                res.end('err');
            }else{
                res.end('ok');
            }
        })
    },1000)
})
router.get("/edit/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("select * from app where id="+id,function (err,result) {
        if(err){
            res.end('err');
        }else{
            res.send(JSON.stringify(result));
        }
    })
})
router.get("/editcon",function (req,res) {
    var id=req.query.id;
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    setTimeout(function(){
        mysql.query(`update app set name='${name}',age='${age}',sex='${sex}' where id=${id}`,function (err,result) {
            if(err){
                res.end('err')
            }else{
                if(result.affectedRows>0){
                    res.send('ok')
                }else{
                    res.send("err");
                }
            }
        })
    },1000)
})
router.get("/check",function(req,res){
    var name=req.query.name;
    var pass=md5(req.query.pass);
    mysql.query(`select * from user where name='${name}' and pass='${pass}'`,function(err,result){
        if(err){
            var obj={code:"",state:'err'}
            res.send(JSON.stringify(obj));
        }else{
            if(result.length>0){
                var obj={code:pass,state:'ok'};
                res.send(JSON.stringify(obj));
            }else{
                var obj={code:"",state:'err'};
                res.send(JSON.stringify(obj));
            }
        }
    })
})
router.get('/addUser',function(req,res){
    var name=req.query.name;
    var pass=md5(req.query.pass);
    mysql.query(`insert into user (name,pass) values ('${name}','${pass}')`,function(err,result){
        if(err){
            res.send("err");
        }else{
            if(result.affectedRows>0){
                res.send("ok");
            } else {
                res.send("err");
            }
        }
    })
})
router.get("/asynCheck",function(req,res){
    var name=req.query.name;
    mysql.query(`select * from user where name='${name}'`,function(err,result){
        if(err){
            res.end("err");
        }else{
            if(result.length>0){
                res.end("ok");
            }else{
                res.end("err");
            }
        }
    })
})
// module.exports = router;