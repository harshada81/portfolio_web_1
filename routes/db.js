var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
    "host":"bjgtaz2ujogpmvhkpdau-mysql.services.clever-cloud.com",
    "user":"uyn6js7gwi7ozat8",
    "password":"6WlguFW7J9Kr7nlTSbVV",
    "database":"bjgtaz2ujogpmvhkpdau"
});

var exe =util.promisify(conn.query).bind(conn);

module.exports=exe;
