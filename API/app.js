

const express = require('express');
const cors = require('cors');

const LOMRouter = require('./routes/LOMObjects');

const app = express();
const rootRouter = express.Router();

rootRouter.use('/api/lom_objects', LOMRouter);

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/', rootRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log('Server is running on PORT 5000....'))

app.get('/', (req,res)=>{
  res.status(200).sendFile(__dirname + "/index.html")
})

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
