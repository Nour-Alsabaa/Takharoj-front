import React from "react";
import { useNavigate } from "react-router-dom";


export default function AddPatient_step2() {
  const navigate = useNavigate();
  return (
    <div className="add-patient-container"  dir="ltr">
      <div className="add-patient-left">
        <form className="add-patient-form">
            <h3 className="add-patient-h3">إضافة مريض جديد</h3>
            <div className="add-patient-input-group">
             <i class="fas fa-map-marker"></i>
             <input placeholder="عنوان السكن"/>
            </div>


            <div className="add-patient-input-group">
             <i class="fas fa-map-marker"></i>
             <input className="id-add-patient-input" placeholder="عنوان العمل" />
            </div>


            <h6 className="gender-add-patient">الحالة الاجتماعية</h6>
            <div className="gender-group">
              <label className="radio-option"><input type="radio" name="gender"/>أعزب</label>
              <label className="radio-option"><input type="radio" name="gender"/>متزوج</label>
              <label className="radio-option"><input type="radio" name="gender"/>مطلق</label>
              <label className="radio-option"><input type="radio" name="gender"/>أرمل</label>
            </div>
            <button className="add-patient-submit2"> إضافة </button>
        </form>
      </div>

      <div className="add-patient-right">
          <img className='syria-logo-add-patient-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
          <h1 className="add-patient-title">الجمهورية العربية السورية</h1>
          <h4 className="add-patient-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
      </div>
    </div>
  );}




           