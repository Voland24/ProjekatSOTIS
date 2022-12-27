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


create(l:LomObject{id:"2"})

create(g:General{title: "Exam 2",
                 langauge: "English",
                 description:"Exam regarding chemistry",
                 keyword:"Chemistry,Exam,Organic",
                 coverage:"College 101 Exam",
                 structure:"10 multiple choice questions"})  
match(l:LomObject{id:"2"}) match(g:General{title:"Exam 2"}) create (l)-[rel:GENERAL]->(g)



create(l:Lifecycle{version:"1.0.2",status:"active",
                   contribute:"Prof. Hideo Kojima", role:"Prof.", date:"15.06.2014."})
match(l:LomObject{id:"2"}) match(lif:Lifecycle{version:"1.0.2"}) create (l)-[rel:LIFECYCLE]->(lif)


create(t:Technical{format:"Web page form",size:"200",
                   location:"moodle-uri/chemExam", 
                   requirement:"Moodle lts platform",
                    type:"LTS web platform",
                    name:"Moodle",
                    minVersion:"1.1",
                    maxVersion:"latest",
                    installationRemarks:"Follow the intstructions on moodle.com",
                    datetime:"15.08.2012.",
                    description:"Moodle is an LTS platform"})
match(l:LomObject{id:"2"}) match(t:Technical{location:"moodle-uri/chemExam"}) create (l)-[rel:TECHNICAL]->(t)

create(e:Educational{interactivity_type:"active",
                    learning_resource_type:"exam",
                   interactivity_level:"low", 
                   semantic_density:"medium",
                    intended_user_role:"learner",
                    context:"higher education",
                    age_range:"18 - 22",
                    difficulty:"high",
                    typical_learning_time:"20h of active class and 10h of self study",
                    description:"Organic Chemistry exam, 101",
                    language:"English"})
match(l:LomObject{id:"2"}) match(e:Educational{description:"Organic Chemistry exam, 101"}) create (l)-[rel:EDUCATIONAL]->(e)

create(r:Rights{cost:"Covered by tuition",
                    copyright:"Rights reserved by the given university",
                   description:"all rights shall remain within the jurisdiction the given faculty"
                  })
match(l:LomObject{id:"2"}) match(r:Rights{description:"all rights shall remain within the jurisdiction the given faculty"}) create (l)-[rel:RIGHTS]->(r)


create(r:Relation{kind:"Science College 101 exam",
                    resource:"moodle-uri/physics101exam",
                   description:"this is a physics exam regarding mechanical motion"
                  })
match(l:LomObject{id:"2"}) match(r:Relation{kind:"Science College 101 exam"}) create (l)-[rel:RELATION]->(r)



Da li može da se modeluje u neo4j na nivou owl-a?

bitnami canvas u virtualnoj mašini se pokreće, ovo je canvas sandbox

na mail imas lti tool, mora da može sa moodle ali i sa canvasom


