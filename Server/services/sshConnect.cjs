var { NodeSSH } = require("node-ssh");
var ssh = new NodeSSH();

var conn = ssh
    .connect({
        host: "202.30.249.33",
        username: "root",
        password: "vkvkdltm",
        readyTimeout: "1000",
        port: "22",
    })
    .then(() => {
        ssh.execCommand("cd /etc/asterisk", {}).then(function (result) {
            console.log("결과 : " + result.stdout);
            console.log("에러 : " + result.stderr);
            console.log(ssh);
            // ssh.execCommand("pwd", {}).then(function (result) {
            //     console.log("결과 : " + result.stdout);
            //     console.log("에러 : " + result.stderr);
            //     ssh.dispose(); //커넥션 종료
            // });
            ssh.dispose();
        });
    });
