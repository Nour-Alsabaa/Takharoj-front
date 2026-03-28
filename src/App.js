import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import CreateAccount from "./create_account";
import States from "./states";
import SearchForAState from "./search_for_a_state";
import PatientFile from "./patient_file";
import Support from "./support";
import DoctorProfile from "./doctor_profile";
import LogIn from "./pages/log_in";
import AddPatient from "./pages/add_patient";
import AddPatient_step2 from "./pages/add_patient_step2";
import AddState from "./pages/add_state";
import AddState2 from "./pages/add_state_step2";
import AddState3 from "./pages/add_state_step3";
import Main from './pages/Main';
function App() {

  const [formData, setFormData] = useState({
  name: "",
  diagnosis: "",
  state: "",
  weight: "",
  height: "",
  bloodPressure: "",
  bloodSugar: "",
  allergies: "",
  vaccines: "",
  diseases: "",
  surgeries: "",
  Sedimentation : "",
  whiteBloodCells: "",
  redBloodCells: "",
  covid: "",
  cancer: ""
});

  return (
    <Routes>
      
      <Route path="/" element={<CreateAccount />} />

      <Route path="/login" element={<LogIn />} />

      <Route path="/states" element={<States />} />

      <Route path="/search" element={<SearchForAState />} />

      <Route path="/patient" element={<PatientFile />} />

      <Route path="/add-patient" element={<AddPatient />} />

      <Route path="/add-patient-step2" element={<AddPatient_step2 />} />

      <Route path="/doctor" element={<DoctorProfile />} />

      <Route path="/support" element={<Support />} />

      <Route path="/add-state" element={<AddState formData={formData} setFormData={setFormData} />} />

      <Route path="/add-state-step2" element={<AddState2 formData={formData} setFormData={setFormData} />} />

      <Route path="/add-state-step3" element={<AddState3 formData={formData} setFormData={setFormData} />} />
          
      <Route path="/Main" element={<Main />} />
    </Routes>
  );
}

export default App;