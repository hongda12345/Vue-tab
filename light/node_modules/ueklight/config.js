
var config={
    port:3000,
    staticDir:"static",
    views:"views",
    staticType:".jpg,.png,.gif,.css,.js,.jpeg",
    type:{
        ".jpg":"image/jpeg",
        ".jpeg":"image/jpeg",
        ".png":"image/png",
        ".gif":"image/gif",
        ".css":"text/css",
        ".js":"application/x-javascript"
    }
};

module.exports=config;