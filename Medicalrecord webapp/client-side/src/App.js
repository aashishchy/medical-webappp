import React from 'react'
import TreatmentPanel from './Treatment';
import PatientsPanel from './Patients';

function App() {
  return (
    <div>
      <h1>Patients Record</h1>
      <PatientsPanel/>
      <h2>TreatmentPanel</h2>
      <TreatmentPanel/>
    </div>
  );
}

export default App;
