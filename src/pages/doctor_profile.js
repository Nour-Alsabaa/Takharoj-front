import React from "react";
import "./doctor_profile.css";
import SideBar from "../Components/SideBar.js";

export default function DoctorProfile() {
  return (
    <div className="profile-container" dir="rtl">

  {/* Sidebar */}
    <SideBar /> 
  {/* Content */}
  <div className="profile-content">

    <div className="profile-info">
      <h2>الجمهورية العربية السورية</h2>
      <p>وزارة الصحة</p>
      <h3 className="doctor-name">محمود الهاشم</h3>
      <span className="doctor-role">التخصص: طبيب عينية</span>
    </div>

    {/* Personal Info */}
    <div className="profile-update-info">
      <h4>المعلومات الشخصية</h4>

      <div className="profile-input-group">
        <i className="fa-solid fa-user"></i>
        <input type="text" placeholder="اسم المستخدم" />
      </div>

      <div className="profile-input-group">
        <i className="fa-solid fa-phone"></i>
        <input type="tel" placeholder="رقم الهاتف" dir="rtl"/>
      </div>

      <div className="profile-input-group">
        <i className="fa-solid fa-envelope"></i>
        <input type="email" placeholder="الإيميل" />
      </div>
    </div>

    {/* Security */}
    <div className="profile-update-info">
      <h4>الأمان</h4>

      <div className="profile-input-group">
        <i className="fa-solid fa-lock"></i>
        <input type="password" placeholder="كلمة المرور" autoComplete="new-password"/>
      </div>
    </div>

    {/* Work */}
    <div className="profile-update-info">
      <h4>معلومات العمل</h4>

      <div className="profile-input-group">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="المدينة" />
      </div>

      <div className="profile-input-group">
        <i className="fa-solid fa-hospital"></i>
        <input type="text" placeholder="المشفى" />
      </div>

      <div className="profile-input-group">
        <i className="fa-solid fa-map"></i>
        <input type="text" placeholder="عنوان المشفى" />
      </div>
    </div>

    {/* Save Button */}
    <div className="profile-save-container">
      <button className="profile-save-btn">حفظ التعديلات</button>
    </div>

  </div>
</div>
  );
}