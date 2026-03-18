import React from "react";
import "./App.css";

export default function Support() {
  return (
    <div className="support-root" dir="rtl">
      <aside className="support-sidebar">
        <div className="support-home">الرئيسية</div>

        <nav className="support-nav">
          <div className="support-item">الملف الشخصي <span className="support-icon">👤</span></div>
          <div className="support-item active">الدعم <span className="support-icon">🛟</span></div>
        </nav>
      </aside>

      <main className="support-main">
        <div className="support-hero">
          <div className="support-hero-blob" />
          <div className="support-hero-button">
            <div className="support-hero-pill">تواصل مع الدعم</div>
            <div className="support-hero-circle">✈️</div>
          </div>
        </div>
      </main>
    </div>
  );
}