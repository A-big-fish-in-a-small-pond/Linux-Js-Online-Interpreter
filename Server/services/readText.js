import fs from 'fs'
import nodeCmd from 'node-cmd'


export default async function readText(req, res){
    let text = req.body;

    fs.writeFile('./sampleFile/result.js', text, err => {
        if (err) {
          console.error(err);
        }
    })

    const obj = {
      result : null,
      resultCode : null,
    }

    let command = "node ./sampleFile/result.js"


    nodeCmd.run(command, 
      (err, data, stderr) =>  {
        if (err) console.log(err)
        if (stderr) console.log(stderr)
        console.log(data);

        obj.result = data
        obj.resultCode = '123'
        return res.json(obj)
      }
      
    );


    // console.log(obj.result)

    

    

}
