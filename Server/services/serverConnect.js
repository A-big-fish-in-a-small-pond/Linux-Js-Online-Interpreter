import sshConnect from "./../utils/sshConnect.cjs";
//import { telnet } from "./../utils/telnetConnect.js";

export default async function serverConnect(req, res) {
    let data = req.body;

    const obj = {
        result: null,
        resultCode: null,
    };

    let connect = data.connect;
    let id = data.id;
    let pw = data.pw;
    let ip = data.ip;
    let port = data.port;

    if (connect == "sshConnect") {
        let resultVO = sshConnect.sshConnect(id, pw, ip, port);
        obj.result = resultVO.result;
        obj.resultCode = resultVO.resultCode;
    } else if (connect == "telnet") {
        //        obj = telnet(id, pw, ip, port);
    } else {
        obj.result = "connect error";
        obj.resultCode = "444";
    }

    return res.json(obj);
}
