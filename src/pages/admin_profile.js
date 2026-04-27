import React, { useState } from "react"; 
import "./admin_profile.css";
import SideBar from "../Components/SideBar.js";

export default function AdminProfile() {

const [form, setForm] = useState({
  username: "",
  phone: "",
  email: "",
  password: ""
});

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = () => {
    if (!isValidEmail(form.email)) {
      alert("الإيميل غير صالح");
      return;
    }};

  return (
<div className="admin-profile-container" >
  {/* Content */}
  <div className="admin-profile-content" dir="rtl">

     <div className="admin-profile-info">
        <h1>مدير الحسابات / الملف الشخصي</h1>
        <div className="admin_profile_purple_line"></div>
        <h2>الجمهورية العربية السورية</h2>
        <p>وزارة الصحة</p>
        <h3 className="admin-profile-name">محمود الهاشم</h3>
        <span className="admin-profile-role">مسؤول</span>
     </div>

  {/* Personal Info */}
  <div className="admin-profile-update-info">
      <h4>المعلومات الشخصية</h4> 

      <div className="admin-profile-input-group">
        <i className="fa-solid fa-user"></i>
        <input type="text"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="اسم المستخدم"
        />
      </div>
      
      <div className="admin-profile-input-group">
        <i className="fa-solid fa-phone"></i>
        <input type="text"
        value={form.phone}
        onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
        setForm({ ...form, phone: value });
        }
        }}
        placeholder="رقم الهاتف"
        />
      </div>

      <div className="admin-profile-input-group">
        <i className="fa-solid fa-envelope"></i>
        <input type="email"
        value={form.email}
        onChange={(e) =>
        setForm({ ...form, email: e.target.value })
        }
        placeholder="الإيميل"
        />
      </div>
    </div>

    {/* Security */}
    <div className="admin-profile-update-info">
      <h4>الأمان</h4>

      <div className="admin-profile-input-group">
        <i className="fa-solid fa-lock"></i>
        <input type="password"  autoComplete="new-password"

        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="كلمة المرور"
        />
      </div>
    </div>


    {/* Save Button */}
    <div className="admin-profile-save-container">
      <button className="admin-profile-save-btn" onClick={handleSubmit}>حفظ التعديلات</button>
    </div>
  </div>

  {/* Sidebar */}
    <SideBar role="admin" /> 
</div>
  );
}