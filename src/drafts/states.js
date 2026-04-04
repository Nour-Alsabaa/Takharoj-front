// import React from 'react';
// import './App.css';

// export default function States() {
//   const cases = [
//     { name: 'أحمد العتيبي', age: 35, date: '12/12/2025', code: 'J11.1' },
//     { name: 'سامي العبدالله', age: 30, date: '10/12/2025', code: 'E11.9' },
//     { name: 'سارة القحطاني', age: 28, date: '12/12/2025', code: 'A09' },
//   ];

//   return (
//     <div className="states-root">
//       <div className="states-search">
//         <div className="search-box">
//           <span className="search-icon">🔍</span>
//           <input placeholder="ادخل رقم وطني , اسم مريض..." />
//         </div>
//         <button className="add-btn">+</button>
//       </div>

//       <h2 className="states-title">آخر الحالات المُسجلة</h2>

//       <div className="cases-list">
//         {cases.map((c, i) => (
//           <div key={i} className="case-card">
//             <div className="case-age">{c.age} سنة</div>
//             <div className="case-body">
//               <div className="case-name">{c.name}</div>
//               <div className="case-meta">تاريخ اخر زيارة : {c.date} <span className="case-code">الرمز : {c.code}</span></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
