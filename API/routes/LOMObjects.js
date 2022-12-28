const express = require('express');
const neo4jSession = require('../neo4jConnection');
const router = express.Router()

router.get("/", (req,res)=>{
    res.status(200).send({msg:"Just checking"})
    // neo4jSession.executeRead((tx)=>{
    //     tx.run(`MATCH (a)-[rel]->(b) return a,rel,b`)
    //       .then((result)=>{
    //         res.status(200).send({payload:result});
    //       })
    //       .catch((err=>{
    //         res.status(500).send({msg:'err'})
    //       }));
    // });
});

router.get("/getSpecificCategory/", (req,res)=>{
  var catName = req.query.category;
  var id = req.query.id
  catName = catName.toUpperCase()
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (a:LomObject{id:"${id}"})-[rel:${catName}]->(b) return a,rel,b`)
      .then((result)=>{
        res.status(200).send(result.records[0]._fields[2].properties);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
});
})

//match (g:General) where g.title contains "Exam" return g

//MATCH (a:LomObject)-[rel:GENERAL]->(b:General{title : "${title}"}) return b

router.get("/searchByTitle/", (req,res)=>{
  var title = req.query.title;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`return g`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(element => {
          returnArray.push(element._fields[0].properties)
        });
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})

//MATCH (g:General)<-[rel1:GENERAL]-(a:LomObject)-[rel:LIFECYCLE]->(b:Lifecycle{contribute : "${prof}"}) return g
router.get("/searchByProfessor/", (req,res)=>{
  var prof = req.query.prof;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (g:General)<-[rel1:GENERAL]-(a:LomObject)-[rel:LIFECYCLE]->(b:Lifecycle) where b.contribute contains "${prof}" return g`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(elem=>{
          returnArray.push(elem._fields[0].properties)
        })
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})


//MATCH (t:Technical)<-[rel1:TECHNICAL]-(a:LomObject)-[rel:GENERAL]->(g:General{title : "${title}"}) return t
router.get("/getTechnicalDetails/", (req,res)=>{
  var title = req.query.title;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (t:Technical)<-[rel1:TECHNICAL]-(a:LomObject)-[rel:GENERAL]->(g:General) where g.title contains "${title}" return t`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(element => {
          returnArray.push(element._fields[0].properties)
        });
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})

router.get("/getSimilarContent/", (req,res)=>{
  var title = req.query.title;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (g:General)<-[rel1:GENERAL]-(a:LomObject)-[rel:RELATION]->(r:Relation) where g.title contains "${title}" return r`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(element => {
          returnArray.push(element._fields[0].properties)
        });
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        console.log(err)
        res.status(500).send(err)
      }));
})
})

router.get("/getByURI/", (req,res)=>{
  var uri = req.query.uri
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`match (g:General)<-[rel:GENERAL]-(l:LomObject)-[rel2:TECHNICAL]->(t:Technical{location:"${uri}"}) return g`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(element => {
          returnArray.push(element._fields[0].properties)
        });
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        console.log(err)
        res.status(500).send(err)
      }));
})
})


router.get("/getByRequirement/", (req,res)=>{
  var requirement = req.query.requirement
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`match (g:General)<-[rel:GENERAL]-(l:LomObject)-[rel2:TECHNICAL]->(t:Technical{requirement:"${requirement}"}) return g`)
      .then((result)=>{
        returnArray = []
        result.records.forEach(element => {
          returnArray.push(element._fields[0].properties)
        });
        res.status(200).send(returnArray);
      })
      .catch((err=>{
        console.log(err)
        res.status(500).send(err)
      }));
})
})


router.get("/getByKeywords/", (req,res)=>{
  var keyword = req.query.keyword
  neo4jSession.
    executeRead((tx)=>{
    tx.run(` match (g:General) with "${keyword}" as var, g.keyword as list, g as res where var in list return res`)
      .then((result)=>{
        retArr = []
        result.records.forEach(elem=>{
          retArr.push(elem._fields[0].properties)
        })
        res.status(200).send(retArr);
      })
      .catch((err=>{
        console.log(err)
        res.status(500).send(err)
      }));
})
})

module.exports = router;