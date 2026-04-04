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

const [city, setCity] = useState("");
const [hospitals, setHospitals] = useState([]);


  return (
    <div className="create-account-container"  dir="ltr">
      <div className="create-account-left">
        <form className="create-account-form">
            <h3 className="create-account-h3">إنشاء حساب جديد</h3>

            <div className="create-account-input-group">
             <i className="fa-solid fa-stethoscope create-account-icon"></i>
             <input list="specialties" placeholder="التخصص" />
             <datalist id="specialties">
               {specialties.map((s, i) => (<option key={i}>{s}</option>))}
             </datalist>
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-city create-account-icon"></i>
             <input list="governorates" placeholder="المحافظة"  
             onChange={(e) => {
             const selectedCity = e.target.value.trim();
             setCity(selectedCity);
             setHospitals(hospitalsByCity[selectedCity] || []);
            }}
            />
             <datalist id="governorates">
               {governorates.map((s, i) => (<option key={i}>{s}</option>))}
             </datalist>
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-hospital create-account-icon"></i>
             <input list="hospitals" placeholder="اسم المشفى" />
             <datalist id="hospitals">
               {hospitals.map((h, i) => (<option key={i} value={h} />))}
             </datalist>
            </div>

            <div className="create-account-input-group">
             <i className="fa-solid fa-location-dot create-account-icon"></i>
             <input type="text" placeholder="عنوان المشفى" />
            </div>

            <button type="button" className="create-account-submit" > إضافة </button>
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







