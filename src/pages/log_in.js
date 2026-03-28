  import React, { useState } from 'react';
  import './log_in.css';

  export default function LogIn() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    return (

      <div className="login-container"  dir="ltr">
        <div className="login-left">
          <img className='syria-logo-login-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
          <h1 className="login-title">الجمهورية العربية السورية</h1>
          <h4 className="login-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
          
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="login-sub">تسجيل الدخول</h2>
            <div className="input-row">
              <input
                placeholder="رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
              <div className="icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2f4f7a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div className="pass-row">
              <input
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? 'text' : 'password'}
              />
              <div className="icon lock" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#9aa7b5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>

            <button className="primary" type="submit">تسجيل الدخول</button>

          </form>
        </div>

        <div className="login-right">
          
        </div>
        
      </div>
      

    
    );
  }
