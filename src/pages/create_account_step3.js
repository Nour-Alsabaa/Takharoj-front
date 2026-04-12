import React, { useState } from 'react';
import './create_account.css';
import { useNavigate } from "react-router-dom";

export default function HospitalForm() {

const specialties = [
  "طب عام",
  "طب الأسرة",
  "طب أطفال",
  "أمراض القلب",
  "طب العيون",
  "طب النساء والولادة",
  "طب الأنف والأذن والحنجرة",
  "طب الجلدية",
  "طب الأعصاب",
  "طب النفس",
  "طب العظام",
  "طب الطوارئ",
  "طب الأشعة",
  "طب الجراحة",
  "أمراض الجهاز الهضمي",
  "طب المسالك البولية",
  " أمراض الكلى",
  "أمراض الدم",
  "الأمراض الصدرية",
  "الأمراض المعدية",
  "طب الأورام",
  "جراحة قلبية",
  "جراحة عظمية",
  "جراحةعصبية",
  "جراحة تجميلية",
  "جراحة عامة",
  "أشعة",
  "مخابر",
  "تخدير",
  "علاج فيزيائي",
  "علوم الأغذية",
  
];

const governorates = [
  "دمشق",
  "حلب",
  "اللاذقية",
  "دير الزور",
  "إدلب",
  "حمص",
  "حماة",
  "درعا",
  "سويداء",
  "قنيطرة",
  "طرطوس",
  "الحسكة",
  "الرقة",
  "ريف دمشق",
];

const hospitalsByCity = {
  "دمشق": ["مشفى المواساة", "مشفى ابن النفيس"],
  "حلب": ["مشفى الرازي", "مشفى الجامعة"],
  "حمص": ["مشفى الوليد", "مشفى حمص الكبير"],
  "حماة": ["مشفى المركز الطبي", "مشفى الحوراني"],
  "اللاذقية": ["مشفى الندى", "مشفى اللاذية الجامعي"],
  "درعا": ["مشفى درعا الوطني"],
};

const [hospitals, setHospitals] = useState([]);
const [formData, setFormData] = useState({
  specialty: "",
  city: "",
  hospital: "",
  address: "",
});

const [errors, setErrors] = useState({});
const validate = () => {
  let newErrors = {};

  if (!formData.specialty) {
    newErrors.specialty = "اختر التخصص";
  }

  if (!formData.city) {
    newErrors.city = "اختر المحافظة";
  }

  if (!formData.hospital) {
    newErrors.hospital = "اختر المشفى";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;
  navigate("/Main"); 
};

const navigate = useNavigate();
  return (
    <div className="create-account-container"  dir="ltr">
      <div className="create-account-left">
        <form className="create-account-form">
            <h3 className="create-account-h3">إنشاء حساب جديد</h3>

            <div className="create-account-input-group">
             <i className="fa-solid fa-stethoscope create-account-icon"></i>
             <select value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="input">
             <option value="">اختر التخصص</option>
             {specialties.map((s, i) => (
             <option key={i} value={s}>{s} </option>))}
            </select>
           </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-city create-account-icon"></i>
             <select value={formData.city} onChange={(e) => {
              const selectedCity = e.target.value;
              setFormData({
              ...formData,
              city: selectedCity,
              hospital: ""
                         });
              setHospitals(hospitalsByCity[selectedCity] || []);
               }}
              className="input"></select>
              <option value="">اختر المحافظة</option>
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-hospital create-account-icon"></i>
             <select value={formData.hospital} onChange={(e) =>
             setFormData({ ...formData, hospital: e.target.value })
              }
             className="input">
            <option value="">اختر المشفى</option>
            {hospitals.map((h, i) => (
            <option key={i} value={h}>
            {h}
            </option>
           ))}
            </select>
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-location-dot create-account-icon"></i>
             <input type="text" placeholder="عنوان المشفى" />
            </div>

            <button type="button" className="create-account-submit" onClick={handleSubmit} 
            disabled={
                !formData.specialty ||
                !formData.city ||
                !formData.hospital
                     } > إضافة 
            </button>        
            
          
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







