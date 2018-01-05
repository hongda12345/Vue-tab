var light=require("ueklight");
require("./router/index")
var query=require("uekquery");
var body=require("uekpost");
var cookie=require("uekcookie");
var app=light();
app.use(query());
app.use(body());
app.use(cookie("12312"));
app.listen(5555);