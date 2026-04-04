// import React, { useRef } from 'react';
// import './App.css';

// export default function VerificationCode() {
//   const inputs = Array.from({ length: 6 }, () => React.createRef());
//   const containerRef = useRef(null);

//   function onKey(e, idx) {
//     const key = e.key;
//     const cur = inputs[idx].current;
//     if (!cur) return;
//     if (/^[0-9]$/.test(key)) {
//       cur.value = key;
//       if (idx < inputs.length - 1) inputs[idx + 1].current.focus();
//       e.preventDefault();
//     } else if (key === 'Backspace') {
//       cur.value = '';
//       if (idx > 0) inputs[idx - 1].current.focus();
//       e.preventDefault();
//     }
//   }

//   function onPaste(e) {
//     const pasted = (e.clipboardData || window.clipboardData).getData('text');
//     const digits = pasted.replace(/\D/g, '').slice(0, inputs.length).split('');
//     digits.forEach((d, i) => { if (inputs[i] && inputs[i].current) inputs[i].current.value = d; });
//     const next = digits.length < inputs.length ? digits.length : inputs.length - 1;
//     inputs[next].current.focus();
//     e.preventDefault();
//   }

//   return (
//     <div className="verify-root" dir="rtl" ref={containerRef} onPaste={onPaste}>
//       <h2 className="verify-title">قد قمنا بإرسال رمز التحقق إلى تيليجرام. يُرجى التحقق من صندوق الوارد وإدخال الرمز لإتمام العملية</h2>

//       <div className="pin-inputs" role="group" aria-label="رمز التحقق">
//         {inputs.map((r, i) => (
//           <input
//             key={i}
//             ref={r}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             className="pin-input"
//             onKeyDown={(e) => onKey(e, i)}
//             onFocus={(e) => e.target.select()}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
