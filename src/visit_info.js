import React from "react";
import "./App.css";

export default function VisitInfo() {
  return (
    <div className="vi-root" dir="rtl">
      <div className="vi-card">
        <div className="vi-header">
          <div className="vi-logo">🦅</div>
          <h2 className="vi-title">معلومات الزيارة</h2>
        </div>

        <div className="vi-body">
          <div className="vi-row">
            <input className="vi-input full" placeholder="اسم المريض *" />
          </div>

          <div className="vi-row">
            <input className="vi-input full" placeholder="التشخيص *" />
          </div>

          <div className="vi-radio-row">
            <label className="vi-radio-title">* الحالة</label>
            <div className="vi-radio-group">
              <label className="vi-radio"><input type="radio" name="state" defaultChecked /> تعافي</label>
              <label className="vi-radio"><input type="radio" name="state" /> نشط</label>
              <label className="vi-radio"><input type="radio" name="state" /> مريض</label>
            </div>
          </div>

          <div className="vi-grid">
            <div className="vi-col">
              <label className="vi-label">الوزن *</label>
              <input className="vi-input" placeholder="كغ" />
            </div>
            <div className="vi-col">
              <label className="vi-label">الطول *</label>
              <input className="vi-input" placeholder="سم" />
            </div>
          </div>

          <div className="vi-grid">
            <div className="vi-col">
              <label className="vi-label">ضغط الدم</label>
              <input className="vi-input" placeholder="مثال: 120/80" />
            </div>
            <div className="vi-col">
              <label className="vi-label">سكر الدم</label>
              <input className="vi-input" placeholder="ممول/دل" />
            </div>
          </div>

          <div className="vi-footer">
            <div className="vi-pager">
              <button className="vi-pager-btn">‹</button>
              <div className="vi-pages"><span className="vi-page current">1</span> <span>من</span> <span className="vi-page">3</span></div>
              <button className="vi-pager-btn">›</button>
            </div>

            <button className="vi-submit">اضافة</button>
          </div>
        </div>
      </div>
    </div>

    //////////////////////////////////////////////////////////

    
  );
}