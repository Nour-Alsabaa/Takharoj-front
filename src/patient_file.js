import React from "react";
import "./App.css";

export default function PatientFile() {
  const visits = [
    { code: "J11.1", date: "12/12/2025", place: "مشفى الرازي الجديد" },
    { code: "E11.9", date: "12/12/2025", place: "مشفى الكندي" }
  ];

  return (
    <div className="patient-file">
      <aside className="pf-sidebar">
        <div className="pf-home">الرئيسية</div>
        <nav className="pf-nav">
          <div className="pf-nav-item">الملف الشخصي</div>
          <div className="pf-nav-item">الدعم</div>
        </nav>
      </aside>

      <main className="pf-main">
        <header className="pf-header">
          <h1 className="pf-name">أحمد العتيبي</h1>
          <div className="pf-gender">
            <span className="pf-gender-item active">ذكر</span>
            <span className="pf-gender-item">اعزب</span>
          </div>
        </header>

        <section className="pf-card pf-personal">
          <div className="pf-left-icons">
            <div className="pf-icon calendar">📅</div>
            <div className="pf-icon pin">📍</div>
            <div className="pf-icon pin">📍</div>
          </div>

          <div className="pf-details">
            <h2 className="pf-title">المعلومات الشخصية</h2>
            <div className="pf-row">
              <div className="pf-label">الرقم الوطني</div>
              <div className="pf-value">04010506642</div>
            </div>
            <div className="pf-row">
              <div className="pf-label">تاريخ الميلاد</div>
              <div className="pf-value">12/1/2000</div>
            </div>
            <div className="pf-row">
              <div className="pf-label">رقم الهاتف</div>
              <div className="pf-value">0943325142</div>
            </div>
            <div className="pf-row muted">
              <div className="pf-label">عنوان السكن</div>
              <div className="pf-value">حمص ، الفاخورة</div>
            </div>
            <div className="pf-row muted">
              <div className="pf-label">عنوان العمل</div>
              <div className="pf-value">حمص ، الفاخورة</div>
            </div>
          </div>
        </section>

        <section className="pf-section">
          <h3 className="pf-section-title">الزيارات (2)</h3>

          <div className="pf-visits">
            {visits.map((v, i) => (
              <article className="pf-visit" key={i}>
                <div className="pf-visit-age">35 سنة</div>
                <div className="pf-visit-card">
                  <div className="pf-visit-code">الرمز : <span>{v.code}</span></div>
                  <div className="pf-visit-meta">
                    <div>تاريخ الزيارة : {v.date}</div>
                    <div className="pf-visit-place">{v.place}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button className="pf-add">+</button>
        </section>
      </main>
    </div>
  );
}