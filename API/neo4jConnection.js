const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://localhost:7999', neo4j.auth.basic('neo4j', 'password'),{ disableLosslessIntegers: true });

const session = driver.session()

if(session){
    console.log('NEO4J Connected....')
}
else{
    console.log('NEO4J NOT CONNECTED')
}

module.exports = session;