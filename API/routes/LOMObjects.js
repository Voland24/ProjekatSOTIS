const express = require('express');
const neo4jSession = require('../neo4jConnection');
const router = express.Router()

router.get("/", (req,res)=>{
    neo4jSession.executeRead((tx)=>{
        tx.run(`MATCH (a)-[rel]->(b) return a,rel,b`)
          .then((result)=>{
            res.status(200).send({payload:result});
          })
          .catch((err=>{
            res.status(500).send({msg:'err'})
          }));
    });
});

router.get("/getSpecificCategory/", (req,res)=>{
  var catName = req.query.category;
  var id = 1
  catName = catName.toUpperCase()
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (a:LomObject{id:"${id}"})-[rel:${catName}]->(b) return a,rel,b`)
      .then((result)=>{
        res.status(200).send({payload:result});
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
});
})


router.get("/searchByTitle/", (req,res)=>{
  var title = req.query.title;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (a:LomObject)-[rel:GENERAL]->(b:General{title : "${title}"}) return b`)
      .then((result)=>{
        res.status(200).send(result.records[0]._fields[0].properties);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})

router.get("/searchByProfessor/", (req,res)=>{
  var prof = req.query.prof;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (g:General)<-[rel1:GENERAL]-(a:LomObject)-[rel:LIFECYCLE]->(b:Lifecycle{contribute : "${prof}"}) return g`)
      .then((result)=>{
        res.status(200).send(result.records[0]._fields[0].properties);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})

router.get("/getTechnicalDetails/", (req,res)=>{
  var title = req.query.title;
  neo4jSession.
    executeRead((tx)=>{
    tx.run(`MATCH (t:Technical)<-[rel1:TECHNICAL]-(a:LomObject)-[rel:GENERAL]->(g:General{title : "${title}"}) return t`)
      .then((result)=>{
        res.status(200).send(result.records[0]._fields[0].properties);
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
    tx.run(`MATCH (g:General{title:"${title}"})<-[rel1:GENERAL]-(a:LomObject)-[rel:RELATION]->(r:Relation) return r`)
      .then((result)=>{
        res.status(200).send(result.records[0]._fields[0].properties);
      })
      .catch((err=>{
        res.status(500).send({msg: err})
      }));
})
})
module.exports = router;