import React from "react";
import axios from "axios";
import './patient.css';


function PatientsPanel(){
    const[patientId,setpatientId]=React.useState('');
    const[name,setname]=React.useState('');
    const[DOB,setDOB]=React.useState('');
    const[Address,setAddress]=React.useState('');
    const[Sex,setSex]=React.useState('');
    const[allergy,setallergy]=React.useState('');
    const[patientlist,setpatientlist]=React.useState([]);

    function fetchPatientsRecords(){
        axios.get('http://localhost:8000/patients')
        .then( (response) => {
           
            // handle success
            setpatientlist(response.data);
            
        });
    }

    function SavePatientrecord(){
        const value = {
            name:name,
            patientId:patientId,
            DOB:DOB,
            Address:Address,
            Sex:Sex,
            allergy:allergy
            
        }

        axios.post('http://localhost:8000/Patient', value)
        .then((response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }
    function updatePatient(){
        const value = {
            name:name,
            patientId:patientId,
            DOB:DOB,
            Address:Address,
            Sex:Sex,
            allergy:allergy
            
            
        }
        axios.put(`http://localhost:8000/updatePatient/${patientId}`, value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        })
    }
    function deletepatient(){
        axios.delete(`http://localhost:8000/deletePatient/${patientId}`)
        .then((response) => {
            setpatientlist(
                patientlist.filter((val)=>{
                    return val.patientId !== patientId;
                })
            )
            // handle success
            //var resData = response.data;
            //let data = JSON.stringify(resData);
            //window.alert("Response recieved from server = " + data);
        });
    }

    
    
    


    function DisplayPatient(){
        fetchPatientsRecords()
    }
    function SavePatient(){
        SavePatientrecord()
    }
    function UpdatePatients(){
        updatePatient()
    }
    function Delete(){
        deletepatient()
    }
    
    
    
    

    return(
        <div>
             <input type="text" placeholder='name' value ={name} onChange ={e => setname(e.target.value) }/>
            <br/>
             <input type="text" placeholder='patientId' value ={patientId} onChange ={e => setpatientId(e.target.value) }/>
            <br/>
           
            <input type="text" placeholder='DOB' value ={DOB} onChange ={e => setDOB(e.target.value) }/>
            <br/> 
            <input type="text" placeholder='Address' value ={Address} onChange ={e => setAddress(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Sex' value ={Sex} onChange ={e => setSex(e.target.value) }/>
            <br/>
            <input type="text" placeholder='allergy' value ={allergy} onChange ={e => setallergy(e.target.value) }/>
            <br/>
            <button onClick={DisplayPatient}>Display Record</button> 
            <br/>
            <button onClick={SavePatient}>Save Record</button> 
            <br/>
            <button onClick={UpdatePatients}>Update Record</button> 
            <br/>
            <button onClick={Delete}>Delete Record</button>
            <br/> 
            {patientlist.map((val,key)=>{
                return(
                    <div><h1>List of patient</h1>
                        <ul>Name:{val.name}</ul>
                    <ul>PatientId:{val.patientId}</ul>
                    <ul>Date of birth :{val.DOB}</ul>
                    <ul>Address :{val.Address}</ul>
                    <ul>Sex:{val.Sex}</ul>
                    <ul style={{color: val.allergy==='Yes' ?'red':'black'}}>Allergy :{val.allergy}</ul>
                    <h2>Treatment are:</h2>
                    <ul>treatId:{val.treatId}</ul>
                    <ul>Category :{val.category}</ul>
                    <ul>startDate :{val.startDate}</ul>
                    <ul style={{color:val.prescriptionIssued==='yes'?'blue':'black'}}>prescriptionIssued:{val.prescriptionIssued}</ul>
                   
                    </div>
                )
            })}
            
            
            

        </div>
    );
}
export default  PatientsPanel;