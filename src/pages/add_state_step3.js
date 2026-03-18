import React from "react";

export default function AddState3({ formData, setFormData }) {
  return (
    <div className="add-state-container" dir="rtl">
      <img className='syria-logo-add-state-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
      <div className="add-state-title">إضافة حالة</div>
      <div className="add-state-stepper3">
              <div className="add-state3">1</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state3">2</div>
              <div className="add-state-stepper-line"></div>
              <div className="add-state as-step-active">3</div>
      </div>
      <div className="add-state-title-form"><h2>التحاليل المرفقة</h2></div>
      <div className="add-state-form">

        <label className="add-state-label">سرعة الترسيب</label>
        <input className="add-state-input-footsteps" onChange={(e) =>setFormData({ ...formData, Sedimentation : e.target.value })}/>

        <div className="add-state-grid">

            <div className="add-state-grid-item">
              <label className="add-state-label">عدد كريات الدم البيضاء</label>
              <input className="add-state-input" onChange={(e) =>setFormData({ ...formData, whiteBloodCells: e.target.value })}/>
            </div>

            <div className="add-state-grid-item">
              <label className="add-state-label">عدد كريات الدم الحمراء</label>
              <input className="add-state-input" onChange={(e) =>setFormData({ ...formData, redBloodCells: e.target.value })}/>
            </div>
            
            <div className="add-state-grid-item">
              <label>ورم سرطاني</label>
              <input list="cancers" className="add-state-input" placeholder="اختر نوع الورم" onChange={(e) => setFormData({ ...formData, cancer: e.target.value })}/>
                <datalist id="cancers">
                   <option value="سرطان الدم" />
                   <option value="سرطان الكبد" />
                   <option value="سرطان ثدي" />
                </datalist>
            </div>

            <div className="add-state-grid-item">
              <label>كورونا</label>
              <input list="corona" className="add-state-input" placeholder="" onChange={(e) => setFormData({ ...formData, covid: e.target.value })}/>
                <datalist id="corona">
                   <option value=" " />
                </datalist>
            </div>

        </div>
        
        <div className="add-state-actions">
            <button className="add-state-btn-primary" onClick={() => console.log(formData)}>إضافة</button>
        </div>
      </div>
    </div>
    );
}
