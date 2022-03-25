var sqlite3=require('sqlite3').verbose();
let db= new sqlite3.Database('Medicalrecord.db',(err)=>{
  if(err){
    console.error(err.message)
  }else{
    console.log("Connected to Medicalrecord database")
  }
});
//create table
const sql=`CREATE TABLE record(treatId integer PRIMARY KEY  NOT NULL , patientId integer NOT NULL, category text,startDate text,prescriptionIssued text, 
  FOREIGN KEY (patientId) REFERENCES patient (patientId))` 
db.run(sql,(err)=>{
  if(err){
    console.log('Table already created.');
  }else{
    console.log('Table created.');
    console.log('Table now created ,creating some rows');
    var insert="INSERT INTO record(treatId ,patientId,category,startDate,prescriptionIssued) VALUES(?,?,?,?,?)";
    db.run(insert,[1,1,'normal',"2020/12/1",'No']);
    db.run(insert,[2,2,'sick',"2020/1/2",'yes']);
    db.run(insert,[3,3,'good',"2010/10/2",'yes']);
    
  
  }
  
});
const sql2="CREATE TABLE patient(name text,patientId INTEGER PRIMARY KEY NOT NULL,DOB text,Address text,Sex text,allergy text)";
db.run(sql2,(err)=>{
  if(err){
    console.log('Table 2 already created.');
  }else{
    console.log('Table 2 created.');
    console.log('Table 2 created ,creating some rows');
    var insert="INSERT INTO patient(name,patientId,DOB ,Address,Sex,allergy) VALUES(?,?,?,?,?,?)";
    db.run(insert,['John',1,'1980/12/12','12 street Slough','M','Yes']);
    db.run(insert,['Brian',2,'1940/12/12','12 Ealing road','M','Yes']);
    db.run(insert,['Alex',3,'1990/1/23','Liverpool','M','No']);
  }
});

module.exports=db