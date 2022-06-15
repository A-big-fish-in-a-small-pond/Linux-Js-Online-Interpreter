var { NodeSSH } = require("node-ssh");
var ssh = new NodeSSH();

async function sshConnect(id, pw, ip, port) {
    const obj = {
        result: null,
        resultCode: null,
    };

    console.log(id);
    console.log(pw);
    console.log(ip);
    console.log(port);

    if (id == null || pw == null || ip == null) {
        obj.result = "Server info error";
        obj.resultCode = "333";
        console.log(obj);
        return obj;
    }
    var conn = ssh
        .connect({
            host: ip,
            username: id,
            password: pw,
            readyTimeout: "1000",
            port: "22",
        })
        // .connect({
        // host: "202.30.249.33",
        // username: "root",
        // password: "vkvkdltm",
        // readyTimeout: "1000",
        // port: "22",
        // })
        .then(() => {
            ssh.execCommand("ls -la", {}).then(function (result) {
                console.log("결과 : " + result.stdout);
                console.log("에러 : " + result.stderr);
                ssh.dispose();
            });
        });
}

module.exports.sshConnect = sshConnect;
