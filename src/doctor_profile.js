import React from 'react';
import './App.css';

export default function DoctorProfile() {
  return (
    <div className="doctor-root" dir="rtl">
      <div className="doc-top">
        <div className="doc-emblem">🦅</div>
        <div className="doc-info">
          <h2 className="doc-country">الجمهورية العربية السورية</h2>
          <h3 className="doc-ministry">وزارة الصحة</h3>
        </div>
        <div className="doc-name-block">
          <div className="doc-name">محمود الهاشم</div>
          <div className="doc-role">طبيب<br/>التخصص : عيون</div>
        </div>
      </div>

      <div className="card doc-card">
        <h3 className="card-title">المعلومات الشخصية</h3>

        <div className="form">
          <div className="input-row">
            <input placeholder="اسم المستخدم" />
            <div className="icon">✏️</div>
          </div>

          <div className="as-grid">
            <div className="as-grid-item">
              <label className="as-label">الايميل</label>
              <div className="as-row">
                <input className="as-input" placeholder="example@mail.com" />
              </div>
            </div>
            <div className="as-grid-item">
              <label className="as-label">رقم الهاتف</label>
              <div className="as-row">
                <input className="as-input" placeholder="09xxxxxxxx" />
              </div>
            </div>
          </div>

          <div className="ap-form">
            <button className="ap-submit">حفظ التغييرات</button>
          </div>
        </div>
      </div>
    </div>
  );
}
