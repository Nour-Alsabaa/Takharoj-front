import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddState2({ formData, setFormData }) {

  const exampleChips = ["فول سوداني", "غلوكوز", "الحصبة", "السّل"];
  const navigate = useNavigate();
  return (
    <div className="add-state-container" dir="rtl">
      <img className='syria-logo-add-state-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
      <div className="add-state-title">إضافة حالة</div>
      <div className="add-state-stepper2">
              <div className="add-state">1</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state as-step-active">2</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state">3</div>
      </div>
      <div className="add-state-title-form"><h2>السجل الطبي</h2></div>
      <div className="add-state-form">

        <label>*الحساسيات</label>
        <input list="allergies" className="add-state-input" placeholder="اختر الحساسية"  onChange={(e) =>setFormData({ ...formData, allergies: e.target.value })}/>

           <datalist id="allergies">
             <option value="فول سوداني" />
             <option value="غلوكوز" />
             <option value="لاكتوز" />
           </datalist>

        <label>*اللقاحات</label>
        <input list="vaccines" className="add-state-input" placeholder="اختر اللقاح" onChange={(e) =>setFormData({ ...formData, vaccines: e.target.value })}/>
         <datalist id="vaccines">
            <option value="السل" />
            <option value="شلل الأطفال" />
            <option value="الحصبة" />
         </datalist>
        
        <label>*أمراض دائمة</label>
        <input list="ChronicDiseases" className="add-state-input" placeholder="اختر المرض" onChange={(e) =>setFormData({ ...formData, diseases: e.target.value })}/>
         <datalist id="ChronicDiseases">
            <option value="ضغط" />
            <option value="سكري" />
         </datalist>

        <label>*السجل الجراحي</label>
        <input list="SurgicalHistory" className="add-state-input" placeholder="اختر العملية الجراحية" onChange={(e) =>setFormData({ ...formData, surgeries: e.target.value })}/>
         <datalist id="SurgicalHistory">
            <option value="تركيب شبكة قلبية" />
            <option value="إزالة مرارة" />
         </datalist>

        <div className="add-state-actions">
            <button className="add-state-btn-primary" onClick={() => navigate("/add-state-step3")}> التالي</button>
        </div>
      </div>
    </div>
    );
}
      