import React, { useState } from 'react';
import './create_account.css';
import { useNavigate } from "react-router-dom";


export default function AccountPasswords() {

// 
const [errors, setErrors] = useState({});

const navigate = useNavigate();

const [formData, setFormData] = useState({
  password: "",
  confirmPassword: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });

  let newErrors = { ...errors };

  // كلمة المرور
  if (name === "name") {
    if (!value) newErrors.name = "هذا الحقل مطلوب";
    else delete newErrors.name;
  }

  //  تأكيد كلمة المرور
  if (name === "username") {
    if (!value) newErrors.username = "هذا الحقل مطلوب";
    else delete newErrors.username;
  }


  setErrors(newErrors);
};


const validate = () => {
  let newErrors = {};

  // كلمة المرور
  if (!formData.password) {
    newErrors.name = "هذا الحقل مطلوب";
  }

  //  تأكيد كلمة المرور
  if (!formData.confirmPassword) {
    newErrors.username = "هذا الحقل مطلوب";
  }
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const handleNext = (e) => {
  e.preventDefault();

  if (!validate()) return;

  navigate("/create-account-step3", { state: formData });
};
// 
  
  return (
    <div className="create-account-container"  dir="ltr">
      <div className="create-account-left">
        <form className="create-account-form">
            <h3 className="create-account-h3">إنشاء حساب جديد</h3>

            <div className="create-account-input-group">
             <i className="fa-solid fa-unlock create-account-icon"></i>
             <input type="password" autoComplete="new-password" placeholder="كلمة المرور"
             onChange={handleChange} name="password"
             className={errors.password ? "input error" : "input"}/>
             {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-lock create-account-icon"></i>
             <input type="password" placeholder="تأكيد كلمة المرور"
             onChange={handleChange} name="confirmPassword"
             className={errors.confirmPassword ? "input error" : "input"}/>
             {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button className="create-account-submit-2" type="button" onClick={handleNext} > متابعة </button>
        </form>
        <br></br>
        <p className="create-account-login">هل لديك حساب؟ <a href="/login">تسجيل الدخول</a></p>
      </div>

      <div className="create-account-right">
          <img className='syria-logo-create-account-logo' src="../images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
          <h1 className="create-account-title">الجمهورية العربية السورية</h1>
          <h4 className="create-account-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
      </div>
    </div>
 );}