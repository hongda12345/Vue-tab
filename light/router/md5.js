var crypto=require("crypto");
function mds(str){
    var hash=crypto.createHash("md5");
    hash.update(str);
    return (hash.digest('hex'));
}
module.exports=mds;
