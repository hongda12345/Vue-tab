var query=require('querystring')
module.exports=function(){
    return function (req,res,reslove) {
        var datas="";
        req.body={};
        req.on("data",function(data){
            datas+=data;
        })
        req.on("end",function () {
            var qobj=(query.parse(datas));
            for(var i in qobj){
                req.body[i]=qobj[i];
            }
            reslove();

        })

    }
}