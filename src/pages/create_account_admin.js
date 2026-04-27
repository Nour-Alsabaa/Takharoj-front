import React, { useState } from 'react';
import './create_account_admin.css';
import { useNavigate } from "react-router-dom";




export default function CreateAccountAdmin() {

const [errors, setErrors] = useState({});

const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
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

  // كلمة المرور
  if (name === "password") {
    if (!value) newErrors.password = "هذا الحقل مطلوب";
    else delete newErrors.password;
  }

  // تأكيد كلمة المرور
  if (name === "confirmPassword") {
    if (!value) newErrors.confirmPassword = "هذا الحقل مطلوب";
    else if (value !== formData.password) newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    else delete newErrors.confirmPassword;
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

  // كلمة المرور
  if (!formData.password) {
    newErrors.password = "هذا الحقل مطلوب";
  }

  // تأكيد كلمة المرور
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "هذا الحقل مطلوب";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "كلمات المرور غير متطابقة";
  }


  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const handleNext = (e) => {
  e.preventDefault();

  if (!validate()) return;

  navigate("/create-account-admin-step2", { state: formData });
};


  return (
    <div className="create-account-admin-container"  dir="ltr">
      <div className="create-account-admin-left">
        <form className="create-account-admin-form">
            <h3 className="create-account-admin-h3">إنشاء حساب جديد</h3>

            <div className="create-account-admin-input-group">
             <i className="fa-solid fa-user create-account-icon"></i>
             <input type="text" placeholder="الاسم" onChange={handleChange} name="name"
             className={errors.name ? "input error" : "input"}/>
             {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="create-account-admin-input-group">
             <i className="fa-solid fa-circle-user create-account-icon"></i>
             <input type="text" placeholder="اسم المستخدم" onChange={handleChange} name="username"
             className={errors.username ? "input error" : "input"}/>
             {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="create-account-admin-input-group">
             <i className="fa-solid fa-at create-account-icon"></i>
             <input placeholder="البريد الإلكتروني" name="email" onChange={handleChange} 
             className={errors.email ? "input error" : "input"}/>
             {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="create-account-admin-input-group">
             <i className="fa-solid fa-unlock create-account-icon"></i>
             <input type="password" placeholder="كلمة المرور" name="password" onChange={handleChange} 
             className={errors.password ? "input error" : "input"}/>
             {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="create-account-admin-input-group">
             <i className="fa-solid fa-lock create-account-icon"></i>
             <input type="password" placeholder="تأكيد كلمة المرور" name="confirmPassword" onChange={handleChange} 
             className={errors.confirmPassword ? "input error" : "input"}/>
             {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="create-account-admin-checkbox-container">
              <label htmlFor="admin" className="create-account-admin-checkbox-span"> إعطاء المستخدم كل الصلاحيات</label>
              <input
              type="checkbox"
              id="admin"
              name="admin"
              className="create-account-admin-checkbox"
              />
           </div>

            <button className="create-account-admin-submit" type="button" onClick={handleNext}> متابعة </button>
          
        </form>
      </div>

      <div className="create-account-admin-right">
          <img className='syria-logo-create-account-admin-logo' src="../images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
          <h1 className="create-account-admin-title">الجمهورية العربية السورية</h1>
          <h4 className="create-account-admin-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
      </div>
    </div>
  );}

  





