import React from 'react';
import './App.css';

export default function Message() {
  return (
    <div className="message-root" dir="rtl">
      <div className="message-card">
        <p className="message-text">سيتم التحقق من المعلومات المزودة، وسيتم إرسال بريد إلكتروني خلال 24 ساعة يتضمن تأكيد حسابكم.</p>
        <p className="message-thanks">شكرا لكم</p>
      </div>
    </div>
  );
}
