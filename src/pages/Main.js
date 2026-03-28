import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'; 
import SideBar from '../Components/SideBar';

export default function Main() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // حالة نص البحث
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/patients')
      .then((response) => {
        if (!response.ok) throw new Error('فشل في جلب البيانات');
        return response.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // دالة الفلترة: تبحث في الاسم أو الكود (الرقم الوطني)
  const filteredPatients = patients.filter((patient) => {
    const term = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(term) || 
      patient.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-container" dir="rtl">
      <SideBar />

      <main className="main-content">
        <div className="bg-watermark"></div>

        <div className="content-wrapper">
          {/* مربع البحث مع الربط بـ searchTerm */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="ادخل رقم وطني , اسم مريض ...." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // مزامنة البحث فورياً
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          {loading && <div className="status-message">جاري التحميل...</div>}
          
          {!loading && !error && (
            // الحالة 1: النظام فارغ تماماً من السيرفر
            patients.length === 0 ? (
              <div className="no-patients-view">
                <div className="no-patients-content">
                  <h2 className="no-patients-text">لا توجد حالات بعد</h2>
                  <button className="add-patient-inline-btn" onClick={() => navigate('/add-patient')}>اضافة مريض</button>
                </div>
              </div>
            ) : 
            // الحالة 2: توجد بيانات ولكن لا يوجد شيء يطابق كلمة البحث
            filteredPatients.length === 0 ? (
              <div className="no-patients-view">
                <div className="no-patients-content">
                  <h2 className="no-patients-text">لا توجد حالة مطابقة للبحث</h2>
                  <button className="add-patient-inline-btn" onClick={() => navigate('/add-patient')}>اضافة مريض</button>
                </div>
              </div>
            ) : (
              // الحالة 3: عرض النتائج المطابقة
              <>
                <div className="header-section">
                  <h1 className="page-title">آخر الحالات المُسجّلة</h1>
                  <button className="add-btn" onClick={() => navigate('/add-patient')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </button>
                </div>
                <div className="patients-list">
                  {filteredPatients.map((patient) => (
                    <div key={patient.id} className="patient-card">
                      <div className="patient-info">
                        <h3 className="patient-name">{patient.name}</h3>
                        <div className="patient-details">
                          <p>تاريخ آخر زيارة : {patient.lastVisit}</p>
                          <p className="patient-code">الرمز : {patient.code}</p>
                        </div>
                      </div>
                      <div className="patient-age">{patient.age} سنة</div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}