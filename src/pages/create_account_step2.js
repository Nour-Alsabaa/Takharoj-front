import React, { useState } from "react";
import "./create_account.css";
import { useNavigate } from "react-router-dom";

export default function AccountPasswords() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  //  التحقق أثناء الكتابة
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    let newErrors = { ...errors };

    //  كلمة المرور
    if (name === "password") {
      if (!value) {
        newErrors.password = "هذا الحقل مطلوب";
      }  if (value.length < 6) {
        newErrors.password = "يجب أن تكون 6 أحرف على الأقل";
      } else {
        delete newErrors.password;
      }
    }

    //  تأكيد كلمة المرور
    if (name === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "هذا الحقل مطلوب";
      } else if (value !== updatedData.password) {
        newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    //  مهم: إعادة التحقق عند تعديل password
    if (name === "password" && updatedData.confirmPassword) {
      if (updatedData.confirmPassword !== value) {
        newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  //  التحقق عند الضغط على الزر
const validate = () => {
  let newErrors = {};

  if (!formData.password) {
    newErrors.password = "هذا الحقل مطلوب";
  } else if (formData.password.length < 6) {
    newErrors.password = "يجب أن تكون 6 أحرف على الأقل";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "هذا الحقل مطلوب";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleNext = (e) => {
    e.preventDefault();

    if (!validate()) return;

    navigate("/create-account-step3", { state: formData });
  };
  return (
    <div className="create-account-container" dir="ltr">
      <div className="create-account-left">
        <form className="create-account-form">
          <h3 className="create-account-h3">إنشاء حساب جديد</h3>

          {/* 🔹 كلمة المرور */}
          <div className="create-account-input-group">
            <i className="fa-solid fa-unlock create-account-icon"></i>

            <input
              type="password"
              autoComplete="new-password"
              placeholder="كلمة المرور"
              name="password"
              onChange={handleChange}
              className={errors.password ? "input error" : "input"}
            />

            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* 🔹 تأكيد كلمة المرور */}
          <div className="create-account-input-group">
            <i className="fa-solid fa-lock create-account-icon"></i>

            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              name="confirmPassword"
              onChange={handleChange}
              className={errors.confirmPassword ? "input error" : "input"}
            />

            {errors.confirmPassword && (
              <span className="error-text">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            className="create-account-submit-2"
            type="button"
            onClick={handleNext}
          >
            متابعة
          </button>
        </form>

        <p className="create-account-login">
          هل لديك حساب؟ <a href="/login">تسجيل الدخول</a>
        </p>
      </div>

      <div className="create-account-right">
        <img
          className="syria-logo-create-account-logo"
          src="../images/Emblem_of_Syria_(2025–present).svg.png"
          alt="logo"
        />
        <h1 className="create-account-title">
          الجمهورية العربية السورية
        </h1>
        <h4 className="create-account-sub">
          وزارة الصحة - منصة التنبؤ بالأوبئة
        </h4>
      </div>
    </div>
  );
}