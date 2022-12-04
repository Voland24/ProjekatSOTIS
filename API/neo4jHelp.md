#Populate NEO4J database

1) create(l:LomObject{id:"1"})  #basic LOM object

2) create(g:General{title: "Exam 1",
                 langauge: "English",
                 description:"Exam regarding physics",
                 keyword:"Physics,Exam,Mechanic",
                 coverage:"College 101 Exam",
                 structure:"4 problems, 4 questions"})  
                 
                 #create general object

3) match(l:LomObject{id:"1"}) match(g:General) create (l)-[rel:GENERAL]->(g) 
#create a relationship between objects


do 2) and 3) for each object in json-data.json file

match (l)-[rel]->(b) #return everything in db