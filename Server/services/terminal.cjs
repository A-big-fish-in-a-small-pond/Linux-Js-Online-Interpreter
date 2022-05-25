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
        //명령어 보내기
        ssh.execCommand("ls -la /etc | grep asterisk", {}).then(function (result) {
            console.log("결과: " + result.stdout);
            console.log("에러: " + result.stderr);
            ssh.dispose(); //커넥션 종료
        });
    });
