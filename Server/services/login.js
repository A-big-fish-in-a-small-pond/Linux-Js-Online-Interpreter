import { ROOT_ID, ROOT_PW } from "./../const/const.js"

export default async function readText(req, res){
    let data = req.body;

    let id = data.id
    let pw = data.pw
    console.log("id : "+ id)
    console.log("pw : " + pw)
    const obj = {
        result : null,
        resultCode : null,
      }

    if (ROOT_ID == id && ROOT_PW == pw){
        obj.result = "success"
        obj.resultCode = "000"
    }else{
        obj.result = "fail"
        obj.resultCode = "123"
    }
    return res.json(obj)

}
