import React from 'react';
import './App.css';

export default function VisitInfo2() {
  return (
    <div className="visit2-root" dir="rtl">
      <div className="visit2-card card">
        <header className="visit2-header">
          <div className="visit2-emblem">🦅</div>
          <div className="visit2-titles">
            <h2 className="visit2-title">معلومات الزيارة</h2>
            <div className="visit2-sub">السجل الطبي</div>
          </div>
        </header>

        <section className="visit2-body">
          <div className="visit2-grid">
            <div className="visit2-col">
              <label className="visit2-label">اللقاحات</label>
              <div className="visit2-input-box">
                <div className="visit2-chip">كورونا <span className="chip-x">✕</span></div>
                <div className="visit2-chip">السل <span className="chip-x">✕</span></div>
              </div>
            </div>

            <div className="visit2-col">
              <label className="visit2-label">الحساسيات</label>
              <div className="visit2-input-box">
                <div className="visit2-chip">فول <span className="chip-x">✕</span></div>
                <div className="visit2-chip">بنزيلين <span className="chip-x">✕</span></div>
              </div>
            </div>
          </div>

          <div className="visit2-grid">
            <div className="visit2-col">
              <label className="visit2-label">أمراض دائمة</label>
              <div className="visit2-input-box">
                <div className="visit2-chip">ضغط الدم <span className="chip-x">✕</span></div>
                <div className="visit2-chip">سكري <span className="chip-x">✕</span></div>
              </div>
            </div>

            <div className="visit2-col">
              <label className="visit2-label">السجل الجراحي</label>
              <div className="visit2-input-box">
                <input className="visit2-fullinput" placeholder="أدخل تفاصيل العمليات الجراحية إن وجدت" />
              </div>
            </div>
          </div>

          <div className="visit2-fullrow">
            <label className="visit2-label">ملاحظات إضافية</label>
            <textarea className="visit2-textarea" placeholder="أي ملاحظات طبية إضافية"></textarea>
          </div>

          <footer className="visit2-footer">
            <div className="visit2-pager">
              <button className="visit2-btn">‹</button>
              <div className="visit2-pages">
                <span className="visit2-page">1</span>
                <span className="visit2-page current">2</span>
                <span className="visit2-page">3</span>
              </div>
              <button className="visit2-btn">›</button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
