var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    "host":"bmh07zjyflwrcmnuxsfb-mysql.services.clever-cloud.com",
    "user":"u2llqjnc4k841z21",
    "password":"YkTiYGsBSx8McWyzcThu",
    "database":"bmh07zjyflwrcmnuxsfb"
});

var exe =util.promisify(conn.query).bind(conn);

module.exports=exe;
