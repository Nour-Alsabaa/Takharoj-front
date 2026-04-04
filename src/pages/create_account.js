import React, { useState } from 'react';
import './create_account.css';
import { useNavigate } from "react-router-dom";



export default function CreateAccount() {

const [errors, setErrors] = useState({});

const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  username: "",
  email: "",
  syndicateNumber: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });

  let newErrors = { ...errors };

  // الاسم
  if (name === "name") {
    if (!value) newErrors.name = "هذا الحقل مطلوب";
    else delete newErrors.name;
  }

  // اسم المستخدم
  if (name === "username") {
    if (!value) newErrors.username = "هذا الحقل مطلوب";
    else delete newErrors.username;
  }

  // الايميل
  if (name === "email") {
    if (!value) newErrors.email = "الايميل مطلوب";
    else if (!/\S+@\S+\.\S+/.test(value))
      newErrors.email = "الايميل غير صالح";
    else delete newErrors.email;
  }

  // رقم النقابة
  if (name === "syndicateNumber") {
    if (!value) newErrors.syndicateNumber = "هذا الحقل مطلوب";
    else if (!/^\d+$/.test(value))
      newErrors.syndicateNumber = "أرقام فقط";
    else delete newErrors.syndicateNumber;
  }

  setErrors(newErrors);
};


const validate = () => {
  let newErrors = {};

  // الاسم
  if (!formData.name) {
    newErrors.name = "هذا الحقل مطلوب";
  }

  // اسم المستخدم
  if (!formData.username) {
    newErrors.username = "هذا الحقل مطلوب";
  }

  // الايميل
  if (!formData.email) {
    newErrors.email = "الايميل مطلوب";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "الايميل غير صالح";
  }

  // رقم التعريف
  if (!formData.syndicateNumber) {
    newErrors.syndicateNumber = "هذا الحقل مطلوب";
  } else if (!/^\d+$/.test(formData.syndicateNumber)) {
    newErrors.syndicateNumber = "يجب إدخال أرقام فقط";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const handleNext = (e) => {
  e.preventDefault();

  if (!validate()) return;

  navigate("/create-account-step2", { state: formData });
};


  return (
    <div className="create-account-container"  dir="ltr">
      <div className="create-account-left">
        <form className="create-account-form">
            <h3 className="create-account-h3">إنشاء حساب جديد</h3>

            <div className="create-account-input-group">
             <i className="fa-solid fa-user create-account-icon"></i>
             <input type="text" placeholder="الاسم" onChange={handleChange} name="name"
             className={errors.name ? "input error" : "input"}/>
             {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-circle-user create-account-icon"></i>
             <input type="text" placeholder="اسم المستخدم" onChange={handleChange} name="username"
             className={errors.username ? "input error" : "input"}/>
             {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-at create-account-icon"></i>
             <input placeholder="البريد الإلكتروني" name="email" onChange={handleChange} 
             className={errors.email ? "input error" : "input"}/>
             {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="create-account-input-group">
             <i className="fa-regular fa-id-badge create-account-icon"></i>
             <input type="text" placeholder="رقم التعريف" onChange={handleChange} name="syndicateNumber"
             className={errors.syndicateNumber ? "input error" : "input"}/>
             {errors.syndicateNumber && <span className="error-text">{errors.syndicateNumber}</span>}
            </div>

            <button className="create-account-submit" type="button" onClick={handleNext}> متابعة </button>
          
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







