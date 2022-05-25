import fs from 'fs'
import nodeCmd from 'node-cmd'


export default async function readText(req, res){
    let text = req.body;

    fs.writeFile('./sampleFile/result.js', text, err => {
        if (err) {
          console.error(err);
          console.log("gdgd")
        }
    })

    const obj = {
      result : null,
      resultCode : null,
    }

    let command = "node ./sampleFile/result.js"

    try{
      nodeCmd.run(command, 
        (err, data, stderr) =>  {
          if (err) {
            console.log(err)
            obj.result = err
            obj.resultCode = '111' 
          }else if(stderr){
            console.log(stderr)
            obj.result = stderr
            obj.resultCode = '222'
          } else{
            console.log(data);
            obj.result = data
            obj.resultCode = '000'
          }
          return res.json(obj)
        }
      );
    }catch(error){
      obj.result = "nodecmd error"
      obj.resultCode = '333'
      console.log("error : " + error)
      return res.json(obj)
    }
}
