import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import LogIn from "./pages/log_in";
import AddPatient from "./pages/add_patient";
import AddPatient_step2 from "./pages/add_patient_step2";
import AddState from "./pages/add_state";
import AddState2 from "./pages/add_state_step2";
import AddState3 from "./pages/add_state_step3";
import Main from './pages/Main';
import DoctorProfile from "./pages/doctor_profile";
import CreateAccount from "./pages/create_account";
import AccountPasswords from "./pages/create_account_step2";
import HospitalForm from "./pages/create_account_step3";
import PatientProfile from "./pages/patient_profile";
// import SearchForAState from "./search_for_a_state";
// import Support from "./support";

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

      <Route path="/create-account-step2" element={<AccountPasswords />} />

      <Route path="/create-account-step3" element={<HospitalForm />} />

      <Route path="/login" element={<LogIn />} />

      <Route path="/add-patient" element={<AddPatient />} />

      <Route path="/add-patient-step2" element={<AddPatient_step2 />} />

      <Route path="/doctor" element={<DoctorProfile />} />

      <Route path="/add-state" element={<AddState formData={formData} setFormData={setFormData} />} />

      <Route path="/add-state-step2" element={<AddState2 formData={formData} setFormData={setFormData} />} />

      <Route path="/add-state-step3" element={<AddState3 formData={formData} setFormData={setFormData} />} />
          
      <Route path="/Main" element={<Main />} />

      <Route path="/patient" element={<PatientProfile />} />

      {/* <Route path="/search" element={<SearchForAState />} /> */}

      {/* <Route path="/support" element={<Support />} /> */}

    </Routes>
  );
}

export default App;