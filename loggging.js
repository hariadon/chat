var fs=require("fs");
var loggerstream=fs.createWriteStream(__dirname+"/access.log",{flags:'a'});
module.exports=require("morgan")("combined",{stream:loggerstream});
