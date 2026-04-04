// import React, { useState } from 'react';
// import './App.css';

// export default function CreateAccount() {
//   const [step, setStep] = useState(1);
//   const [showPass, setShowPass] = useState(false);

//   function goNext(e) {
//     e.preventDefault();
//     setStep((s) => Math.min(2, s + 1));
//   }


//   const [view, setView] = useState('step1');

//   return (
//     <div style={{ width: '100%' }}>
//       <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
//         <button onClick={() => setView('step1')} style={{ background: 'transparent', border: 0, color: view === 'step1' ? '#0b557b' : '#6b8193' }}>الواجهة 1</button>
//         <button onClick={() => setView('passwords')} style={{ background: 'transparent', border: 0, color: view === 'passwords' ? '#0b557b' : '#6b8193' }}>الواجهة 2</button>
//         <button onClick={() => setView('hospital')} style={{ background: 'transparent', border: 0, color: view === 'hospital' ? '#0b557b' : '#6b8193' }}>الواجهة 3</button>
//       </div>

//       <div>
//         {view === 'step1' && <AccountStep1 onNext={() => setView('passwords')} />}
//         {view === 'passwords' && <AccountPasswords onBack={() => setView('step1')} onFinish={() => setView('hospital')} />}
//         {view === 'hospital' && <HospitalForm />}
//       </div>
//     </div>
//   );
// }

// function AccountStep1({ onNext }) {
//   return (
//     <div>
//       <div className="brand">منصة التنبؤ بالأوبئة</div>
//       <div className="card">
//         <h1 className="card-title">انشاء حساب</h1>
//         <div className="card-sub">الدور</div>

//         <form className="form" onSubmit={(e) => { e.preventDefault(); onNext && onNext(); }}>
//           <label className="input-row">
//             <input type="text" placeholder="الاسم" />
//             <span className="icon person">👤</span>
//           </label>

//           <label className="input-row">
//             <input type="text" placeholder="اسم المستخدم" />
//             <span className="icon person">👤</span>
//           </label>

//           <label className="input-row">
//             <input type="email" placeholder="الايميل" />
//             <span className="icon mail">@</span>
//           </label>

//           <label className="input-row">
//             <input type="text" placeholder="رقم نقابة الأطباء" />
//             <span className="icon phone">📞</span>
//           </label>

//           <button type="submit" className="primary">متابعة</button>

//           <div className="login-line">لديك حساب بالفعل؟ <a href="#">سجل دخول</a></div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function AccountPasswords({ onBack, onFinish }) {
//   const [showPass, setShowPass] = useState(false);
//   return (
//     <div>
//       <div className="brand">منصة التنبؤ بالأوبئة</div>
//       <div className="card">
//         <h1 className="card-title">انشاء حساب</h1>
//         <div className="card-sub">الدور</div>

//         <form className="form" onSubmit={(e) => { e.preventDefault(); onFinish && onFinish(); }}>
//           <div className="input-row pass-row">
//             <span className="left-icon eye">👁️</span>
//             <input type={showPass ? 'text' : 'password'} placeholder="كلمة المرور" />
//             <span className="icon lock">🔒</span>
//           </div>

//           <div className="input-row pass-row">
//             <span className="left-icon eye">👁️</span>
//             <input type={showPass ? 'text' : 'password'} placeholder="تأكيد كلمة المرور" />
//             <span className="icon lock">🔒</span>
//           </div>

//           <div style={{ display: 'flex', gap: 12 }}>
//             <button type="button" className="primary" onClick={() => onFinish && onFinish()}>متابعة</button>
//             {onBack && <button type="button" onClick={onBack} style={{ background: 'transparent', border: 0, color: '#0b6a8f', alignSelf: 'center' }}>الرجوع</button>}
//           </div>

//           <div className="login-line">لديك حساب بالفعل؟ <a href="#">سجل دخول</a></div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function HospitalForm({ onFinish }) {
//   return (
//     <div>
//       <div className="brand">منصة التنبؤ بالأوبئة</div>
//       <div className="card">
//         <h1 className="card-title">انشاء حساب</h1>
//         <div className="card-sub">الدور</div>

//         <form className="form" onSubmit={(e) => { e.preventDefault(); onFinish && onFinish(); }}>
//           <label className="input-row">
//             <span className="icon">
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4.5" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M9 10a3 3 0 1 1 6 0v1H9v-1z" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M7 5h10" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </span>
//             <input type="text" placeholder="التخصص" />
//           </label>

//           <label className="input-row">
//             <span className="icon">
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="3" y="7" width="18" height="13" rx="2" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M7 7V4h10v3" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 11v6" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </span>
//             <input type="text" placeholder="المشفى" />
//           </label>

//           <label className="input-row">
//             <span className="icon">
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M3 21h18" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M5 10h3v8H5zM10 6h3v12h-3zM15 13h3v5h-3z" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </span>
//             <input type="text" placeholder="المدينة" />
//           </label>

//           <label className="input-row">
//             <span className="icon">
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//                 <circle cx="12" cy="10" r="2.5" stroke="#234e73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </span>
//             <input type="text" placeholder="عنوان المشفى" />
//           </label>

//           <button type="submit" className="primary">انتهاء</button>

//           <div className="login-line">لديك حساب بالفعل؟ <a href="#">سجل دخول</a></div>
//         </form>
//       </div>
//     </div>
//   );
// }
