import React from "react";
import "./patient_profile.css";
import SideBar from "../Components/SideBar.js";

export default function PatientProfile() {
  return (
    <div className="patient-profile-container" dir="rtl">
      {/* Sidebar */}
      <SideBar />
      <div className="patient-profile-left">
        <div className="patient-profile-bg-watermark"></div>
        <div className="patient-profile-header">
          <h1 className="patient-profile-name">أحمد العتيبي</h1>
          <div className="patient-profile-gender"></div>          <span className="patient-profile-span">ذكر</span>            
          <div className="patient-profile-social-status"></div>   <span className="patient-profile-span">أعزب</span>  
          <div className="patient-profile-social-status"></div>   <span className="patient-profile-span">25 سنة</span>
        </div>

        {/* Personal Info */}
        <div className="patient-profile-info">
          <h3 className="patient-profile-info-title">المعلومات الشخصية</h3>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-id-card patient-profile-icon"></i>
            <span className="patient-profile-info-span">الرقم الوطني</span>
            <span className="patient-profile-info-span">04010506642</span>
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-calendar patient-profile-icon"></i>
            <span className="patient-profile-info-span">تاريخ الميلاد</span>
            <span className="patient-profile-info-span">12/1/2000</span>
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-phone patient-profile-icon"></i>
            <span className="patient-profile-info-span">رقم الهاتف</span>
            <span className="patient-profile-info-span">0994616117</span> 
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-location-dot patient-profile-icon"></i>
            <span className="patient-profile-info-span">عنوان السكن</span>
            <span className="patient-profile-info-span">حمص - الفاخورة</span>   
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-location-dot patient-profile-icon"></i>
            <span className="patient-profile-info-span">عنوان العمل</span>
            <span className="patient-profile-info-span">حمص - الفاخورة</span>
          </div>
        </div>

        {/* Visits */}
        <div className="patient-profile-visits">
          <h3 className="patient-profile-visits-title">الزيارات (2)</h3>
          <div className="patient-profile-visit-card">
            <div className="patient-profile-visit-right">
              <h4>الرمز : J11.1</h4>
              <p>تاريخ الزيارة : 12/12/2025</p>
              <p>مشفى الرازي الجديد</p>
            </div>
          </div>

          <div className="patient-profile-visit-card">
            <div className="patient-profile-visit-right">
              <h4>الرمز : E11.9</h4>
              <p>تاريخ الزيارة : 12/12/2025</p>
              <p>مشفى الكندي</p>
            </div>
          </div>
        </div>

        {/* Floating Button */}
        <button className="patient-profile-visit-btn">
          <i className="fa-solid fa-plus"></i>
        </button>

      </div>
       
      
    </div>
  );
}