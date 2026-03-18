import React from "react";
import { useNavigate } from "react-router-dom";
import "./add_state.css";

export default function AddState({ formData, setFormData }) {
  const navigate = useNavigate();

  return (
    <div className="add-state-container" dir="rtl">
      <img className='syria-logo-add-state-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
      <div className="add-state-title">إضافة حالة</div>
      <div className="add-state-stepper">
              <div className="add-state as-step-active">1</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state">2</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state">3</div>
      </div>
      <div className="add-state-form">
        <label>*اسم المريض</label>
        <input list="patients" className="add-state-input" placeholder="اختر المريض"  onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>

            <datalist id="patients">
              <option value="أحمد العتيبي" />
              <option value="محمد العتيبي" />
              <option value="نور العتيبي" />
            </datalist>

        <label>*التشخيص</label>
        <input list="illness" className="add-state-input" placeholder="اختر التشخيص" onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}/>

            <datalist id="illness">
              <option value="ضغط الدم" />
              <option value="سكر شبابي" />
              <option value="انفلونزا" />
            </datalist>

        <label>*الحالة</label>
            <div className="add-state-state-radio-group">
              <label className="add-state-radio"><input type="radio" name="state" defaultChecked onChange={() =>setFormData({ ...formData, state: "تعافي" })}/> تعافي</label>
              <label className="add-state-radio"><input type="radio" name="state"                onChange={() =>setFormData({ ...formData, state: "نشط" })} /> نشط</label>
              <label className="add-state-radio"><input type="radio" name="state"                onChange={() =>setFormData({ ...formData, state: "مريض" })}/> مريض</label>
            </div>
         

        <div className="add-state-grid">

            <div className="add-state-grid-item">
              <label className="add-state-label">الوزن</label>
              <input className="add-state-input" placeholder="كغ" onChange={(e) =>setFormData({ ...formData, weight: e.target.value })}/>
            </div>

            <div className="add-state-grid-item">
              <label className="add-state-label">الطول</label>
              <input className="add-state-input" placeholder="سم"onChange={(e) =>setFormData({ ...formData, height: e.target.value })}/>
            </div>

            <div className="add-state-grid-item">
              <label>ضغط الدم</label>
              <input className="add-state-input" placeholder="مثال: 120/80" onChange={(e) =>setFormData({ ...formData, bloodPressure: e.target.value })}/>
            </div>

            <div className="add-state-grid-item">
              <label>سكر الدم</label>
              <input className="add-state-input" placeholder="ممول/دل" onChange={(e) =>setFormData({ ...formData, bloodSugar: e.target.value })}/>
            </div>

        </div>

        <div className="add-state-actions">
           <button className="add-state-btn-primary"onClick={() => navigate("/add-state-step2")}> التالي </button>
        </div>

        </div>
    </div>
  );
}
 