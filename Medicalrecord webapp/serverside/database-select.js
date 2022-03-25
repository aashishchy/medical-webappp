var sqlite3=require("sqlite3").verbose();
let db= new sqlite3.Database("Medicalrecord.db");
//let sql = 'SELECT * FROM  record CROSS JOIN patient';
//let sql2=  `SELECT name,allergy,prescription FROM patient ORDER BY allergy`;
//let sql = 'SELECT * FROM record';
let sql="SELECT * FROM patient,record WHERE  record.patientId=patient.patientId"


db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log('treatId= '+row.treatId +' category= '+ row.category +' startDate= ' +  row.startDate  + ' patientId : ' + row.patientId + ' allergy= '+ row.allergy +' prescriptionIssued= '+ row.prescriptionIssued );
    console.log('name=' + row.name + ' DOB=' + row.DOB + ' Address= '+row.Address + ' Sex= ' + row.Sex);
    //console.log(row);
  });
});


// close the database connection
db.close();