var express=require('express');
var cors=require('cors');
var bodyParser=require('body-parser');
var db=require('./database.js');

var app=express()
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Server port
var HTTP_PORT=8000;
//Server starting
app.listen(HTTP_PORT,()=>{
    console.log("Server running on port %PORT%".replace('%PORT%',HTTP_PORT))

});
//root endpoint
app.get('/',(req,res,next)=>{
    res.json({'message':'ok'})

});
//list treatment record
app.get('/treatments',(req,res,next)=>{
    console.log("SELECT Treatment with patients");
    let sql="SELECT * FROM record   ORDER BY patientId";
    var params=[]
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({'error':err.message})
            result;
        }
        res.send(rows);
        /*res.json({
            'message':'success',
            'data':rows
        })*/
    });

});

//list by treatId
app.get("/treatments/:treatId", (req, res, next) => {
    var sql = "SELECT * FROM record where treatId = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
//create treatment records
app.post('/treatment/',(req,res,next)=>{
    console.log("saving")
    var errors=[]
    if(!req.body.treatId){
        console.log('error happen');
        errors.push("Treatment not specified")
    }

    if (errors.length){
        console.log("400 error")
        res.status(400).json({"error":errors.join(",")});
        return;

    }
    
    var data={
        treatId:req.body.treatId,
        patientId:req.body.patientId,
        category:req.body.category,
        startDate:req.body.startDate,
        prescriptionIssued:req.body.prescriptionIssued
    }
    var sql = "INSERT INTO record(treatId ,patientId,category,startDate,prescriptionIssued) VALUES(?,?,?,?,?)"
    var params=[data.treatId ,data.patientId,data.category,data.startDate,data.prescriptionIssued]
    db.run(sql,params,(err,result)=>{
        if (err){
            console.log('error')
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })   
    
    });
});
//delete
app.delete("/deleteTreatment/:patientId", (req, res, next) => {
    console.log("DELETE treatmentrecord:" + req.params.patientId);
    db.run(
        'DELETE FROM record WHERE patientId = ?',
        req.params.patientId,function (err, result) {
            if (err){
                console.log('error')
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});
//update treatment 
app.put("/updateTreatment/:patientId", (req, res, next) => {
    console.log("UPDATE Treatment:" + req.params.patientId);
    var data = {
        treatId:req.body.treatId,
        patientId:req.body.patientId,
        category:req.body.category,
        startDate:req.body.startDate,
        prescriptionIssued:req.body.prescriptionIssued  
    }
    console.log("UPDATE treatment: data.patientId = " + data.patientId);
    db.run(
        `UPDATE record SET
        treatId = ?,
        patientId=?,
        category=?,
        startDate=?,
        prescriptionIssued=?
          WHERE patientId=?`,

        [data.treatId,data.patientId,data.category,data.startDate,data.prescriptionIssued,req.params.patientId],
        function(err, result) {
            if (err){
                console.log('error');
                res.status(400).json({"error": res.message})
                return;
            }
            console.log('Update succesfull')
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
});
//list patient record
app.get('/patients',(req,res,next)=>{
    console.log("SELECT Treatment with patients");
    let sql="SELECT * FROM patient,record WHERE  record.patientId=patient.patientId";
    //let sql="SELECT * FROM patient ORDER BY patientId";
    var params=[]
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({'error':err.message})
            result;
        }
        res.send(rows);
        /*res.json({
            'message':'success',
            'data':rows


        })*/
    });

});

//save patient record
app.post('/patient/',(req,res,next)=>{
    var errors=[]
    if(!req.body.patientId){
        console.log('error');
        errors.push("Patient_record not specified")
    }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;

    }  

    var data={
        name:req.body.name,
        patientId:req.body.patientId,
        DOB:req.body.DOB,
        Address:req.body.Address,
        Sex:req.body.Sex,
        Allergy:req.body.allergy
        
    }
    var sql = "INSERT INTO patient(name,patientId,DOB ,Address,Sex,allergy) VALUES(?,?,?,?,?,?)"
    var params=[data.name ,data.patientId,data.DOB,data.Address,data.Sex,data.Allergy]
    db.run(sql,params,(err,result)=>{
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })   
    
    });
});
//update patient record
app.put("/updatePatient/:patientId", (req, res, next) => {
    console.log("UPDATE Patient:" + req.params.patientId);
    var data = {
        name:req.body.name,
        patientId:req.body.patientId,
        DOB:req.body.DOB,
        Address:req.body.Address,
        Sex:req.body.Sex,
        Allergy:req.body.allergy
        
    }
    console.log("UPDATE patient: data.patientId = " + data.patientId);
    db.run(
        `UPDATE patient SET
        name=?,
        patientId=?,
        DOB=?,
        Address=?,
        Sex=?,
        allergy=?
         WHERE patientId=?`,
        [data.name ,data.patientId,data.DOB,data.Address,data.Sex,data.Allergy,req.params.patientId],
        function(err, result) {
            if (err){
                console.log('error');
                res.status(400).json({"error": res.message})
                return;
            }
            console.log('Update succesfull')
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
});
app.delete("/deletePatient/:patientId", (req, res, next) => {
    console.log("DELETE patientrecord:" + req.params.patientId);
    db.run(
        'DELETE FROM patient WHERE patientId = ?',
        req.params.patientId,function (err, result) {
            if (err){
                console.log('error')
                res.status(400).json({"error": res.message})
                return;
            }
            res.send(result);
            //res.json({"message":"deleted", changes: this.changes})
    });
});



app.use(function(req, res){
    res.status(404);
});