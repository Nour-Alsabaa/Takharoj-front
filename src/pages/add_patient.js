import React from "react";
import './add_patient.css';
import { useNavigate } from "react-router-dom";


export default function AddPatient() {
  const navigate = useNavigate();
  return (
    <div className="add-patient-container"  dir="ltr">
      <div className="add-patient-left">
        <form className="add-patient-form">
            <h3 className="add-patient-h3">إضافة مريض جديد</h3>
            <div className="add-patient-input-group">
             <i className="fa-solid fa-user"></i>
             <input placeholder="اسم المريض"/>
            </div>

            <div className="add-patient-input-group">
             <i className="fa-solid fa-calendar BD-add-patient-icon"></i>
             <input type="date" className="BD-add-patient-input" placeholder="تاريخ الميلاد"/>
            </div>

            <div className="add-patient-input-group">
             <i className="fa-solid fa-id-card id-add-patient-icon"></i>
             <input className="id-add-patient-input" placeholder="الرقم الوطني" />
            </div>

            <div className="add-patient-input-group">
             <i className="fa-solid fa-phone phone-add-patient-icon"></i>
             <input className="phone-add-patient-input" placeholder="رقم الهاتف" />
            </div>

            <h6 className="gender-add-patient">الجنس</h6>
            <div className="gender-group">
              <label className="radio-option"><input type="radio" name="gender"/>ذكر</label>
              <label className="radio-option"><input type="radio" name="gender"/>أنثى</label>
            </div>
            <button className="add-patient-submit"  onClick={() => navigate("/add-patient-step2")}> متابعة </button>
        </form>
      </div>

      <div className="add-patient-right">
          <img className='syria-logo-add-patient-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
          <h1 className="add-patient-title">الجمهورية العربية السورية</h1>
          <h4 className="add-patient-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
      </div>
    </div>
  );}




           