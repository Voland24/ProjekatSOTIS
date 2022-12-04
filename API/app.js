
const xml2js = require("xml2js");
const fs = require("fs");


const xml_data = fs.readFileSync('./LOM-data.xml')

xml2js.parseString(xml_data, (err, result) => {
    if (err) {
      throw err
    }
  
    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4)
  
    // log JSON string
    fs.writeFileSync("json-data.json", json)
  })
