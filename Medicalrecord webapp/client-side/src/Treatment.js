import React from "react";
import axios from "axios";

function TreatmentPanel(){
    const[treatId,settreatId]=React.useState('');
    const[patientId,setpatientId]=React.useState('');
    const[category,setcategory]=React.useState('');
    const[startDate,setstartDate]=React.useState('');
    const[prescriptionIssued,setprescriptionIssued]=React.useState('');
    const[treatmentlist,settreatmentlist]=React.useState([]);


    function fetchRecords(){
        axios.get('http://localhost:8000/treatments')
        .then( (response) => {
            settreatmentlist(response.data);
            // handle success
            /*var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);*/
        });
    }


    function saveTreatmentrecord(){
        const value = {
            treatId:treatId,
            patientId:patientId,
            category:category,
            startDate:startDate,
            prescriptionIssued:prescriptionIssued
        }

        axios.post('http://localhost:8000/treatment', value)
        .then((response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }

    
    function updatetreatment(){
        const value = {
            treatId:treatId,
            patientId:patientId,
            category:category,
            startDate:startDate,
            prescriptionIssued:prescriptionIssued
            
        }
        axios.put(`http://localhost:8000/updatetreatment/${patientId}`, value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        })
    }

    function deletetreatmemt(){
        axios.delete(`http://localhost:8000/deleteTreatment/${patientId}`)
        .then((response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }

    function DisplayTreatment(){
        fetchRecords();

    }
    function saveTreatment(){
        saveTreatmentrecord();
    }
    function updateTreatmentrecord(){
        updatetreatment()
    }

    function DeleteTreatment(){
        deletetreatmemt()
    }
    return(
        <div>
            <input type="text" placeholder='treatId' value ={treatId} onChange ={e => settreatId(e.target.value) }/>
            <br/>
            <input type="text" placeholder='patientId' value ={patientId} onChange ={e => setpatientId(e.target.value) }/>
            <br/>
            <input type="text" placeholder='category' value ={category} onChange ={e => setcategory(e.target.value) }/>
            <br/>
            <input type="text" placeholder='startDate' value ={startDate} onChange ={e => setstartDate(e.target.value) }/>
            <br/> 
            <input type="text" placeholder='prescriptionIssued' value ={prescriptionIssued} onChange ={e => setprescriptionIssued(e.target.value) }/>
            <br/>
            <button onClick={saveTreatment}>Save Record</button> 
            <br/>
            <button onClick={DisplayTreatment}>DisplayTreatment</button> 
            <br/>
            <button onClick={updateTreatmentrecord}>UpdateTreatment</button> 
            <br/>
            <button onClick={DeleteTreatment}>DeleteTreatment</button> 
            <br/>
            {treatmentlist.map((val,key)=>{
                return(
                    <div>
                        <h1>Treatment are:</h1>
                        <ul>treatId:{val.treatId}</ul>
                        <ul>patientId:{val.patientId}</ul>
                        <ul>Category :{val.category}</ul>
                        <ul>startDate :{val.startDate}</ul>
                        <ul style={{color:val.prescriptionIssued==='yes'?'blue':'black'}} >prescriptionIssued:{val.prescriptionIssued}</ul>

                    </div>
                )
            })}
            {treatmentlist.filter(val=>val.category==="good").map((val,key)=>{
                return(
                    <div>
                        <h1>Treatment with filter category good are:</h1>
                        <ul>treatId:{val.treatId}</ul>
                        <ul>patientId:{val.patientId}</ul>
                        <ul>Category :{val.category}</ul>
                        <ul>startDate :{val.startDate}</ul>
                        <ul style={{color:val.prescriptionIssued==='yes'?'blue':'black'}}>prescriptionIssued:{val.prescriptionIssued}</ul>

                    </div>

                )
            })}
        </div>
        
    );



}
export default TreatmentPanel;
    


    

