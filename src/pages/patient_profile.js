
import { useParams ,useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./patient_profile.css";
import SideBar from "../Components/SideBar.js";

export default function PatientProfile() {
  const { id } = useParams(); 

  // [إضافة جديدة]: حالات (States) لحفظ بيانات المريض، حالة التحميل، والأخطاء
  const [patient, setPatient] = useState(null); // يبدأ بـ null لأنه كائن واحد وليس مصفوفة
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // [إضافة جديدة]: useEffect لجلب بيانات المريض فور فتح الصفحة
  useEffect(() => {
    // نرسل الـ id المستخرج من الرابط إلى مسار الـ API الجديد في سيرفر Flask
    fetch(`http://127.0.0.1:5000/api/patients/${id}`)
      .then((response) => {
        // إذا كان الرد غير ناجح (مثل 404 المريض غير موجود)
        if (!response.ok) throw new Error('لم يتم العثور على المريض');
        return response.json(); // تحويل الرد إلى JSON
      })
      .then((data) => {
        setPatient(data); // حفظ بيانات المريض في الـ State
        setLoading(false); // إيقاف حالة التحميل
      })
      .catch((err) => {
        setError(err.message); // حفظ رسالة الخطأ
        setLoading(false);
      });
  }, [id]); // الوسيط الثاني [id] يعني: أعد تشغيل الدالة إذا تغير الـ id في الرابط

  // [إضافة جديدة]: التعامل مع واجهة المستخدم أثناء التحميل أو في حال وجود خطأ
  if (loading) return <div className="patient-profile-container" dir="rtl"><SideBar /><h2 style={{padding: '50px'}}>جاري تحميل بيانات المريض...</h2></div>;
  if (error) return <div className="patient-profile-container" dir="rtl"><SideBar /><h2 style={{padding: '50px', color: 'red'}}>{error}</h2></div>;
  if (!patient) return null;

  return (
    <div className="patient-profile-container" dir="rtl">
      {/* Sidebar */}
      <SideBar />
      <div className="patient-profile-left">
        <div className="patient-profile-bg-watermark"></div>
        <div className="patient-profile-header">
          <h1 className="patient-profile-name">{patient.name}</h1>
          <div className="patient-profile-gender"></div>          <span className="patient-profile-span">{patient.gender}</span>            
          <div className="patient-profile-social-status"></div>   <span className="patient-profile-span">{patient.socialStatus}</span>  
          <div className="patient-profile-social-status"></div>   <span className="patient-profile-span">{patient.age} سنة</span>
        </div>

        {/* Personal Info */}
        <div className="patient-profile-info">
          <h3 className="patient-profile-info-title">المعلومات الشخصية</h3>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-id-card patient-profile-icon"></i>
            <span className="patient-profile-info-span">الرقم الوطني</span>
            <span className="patient-profile-info-span">{patient.id}</span>
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-calendar patient-profile-icon"></i>
            <span className="patient-profile-info-span">تاريخ الميلاد</span>
            <span className="patient-profile-info-span">{patient.dob}</span>
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-phone patient-profile-icon"></i>
            <span className="patient-profile-info-span">رقم الهاتف</span>
            <span className="patient-profile-info-span">{patient.phone}</span> 
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-location-dot patient-profile-icon"></i>
            <span className="patient-profile-info-span">عنوان السكن</span>
            <span className="patient-profile-info-span">حمص - الفاخورة</span>   
          </div>

          <div className="patient-profile-info-row">
            <i className="fa-solid fa-location-dot patient-profile-icon"></i>
            <span className="patient-profile-info-span">عنوان العمل</span>
            <span className="patient-profile-info-span">{patient.workAddress}</span>
          </div>
        </div>

        {/* Visits */}
        <div className="patient-profile-visits">
          <h3 className="patient-profile-visits-title">الزيارات ({patient.visits ? patient.visits.length : 0})</h3>
          {patient.visits && patient.visits.map((visit, index) => (
          <div key={index} className="patient-profile-visit-card">
            <div className="patient-profile-visit-right">
              <h4>الرمز : {visit.code}</h4>
              <p>تاريخ الزيارة : {visit.date}</p>
              <p>{visit.hospital}</p>
            </div>
          </div>
          ))}
        </div>

        {/* Floating Button */}
        <button className="patient-profile-visit-btn" onClick={() => navigate('/add-state')}>
          <i className="fa-solid fa-plus"></i>
        </button>

      </div>
       
      
    </div>
  );
}