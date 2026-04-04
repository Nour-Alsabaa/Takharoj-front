import React from 'react';
import { useNavigate } from "react-router-dom";


export default function SideBar() {
  const navigate = useNavigate();
  return (
    <aside className="w-[260px] bg-[#0a1d37] text-white flex flex-col p-6 z-10 shrink-0">
      
      {/* مساحة الشعار */}
      <div className="h-20 mb-6 flex items-center justify-center">
        <img className='syria-logo-add-patient-logo' src="/images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
      </div>
      
      {/* روابط القائمة */}
      <nav className="flex flex-col gap-2">
        {/* العنصر النشط (الرئيسية) */}
        <div className="flex items-center gap-4 p-3 rounded-lg cursor-pointer bg-blue-100/20 text-white border-r-4 border-white font-bold transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>الرئيسية</span>
        </div>

        {/* العناصر غير النشطة */}
        <div onClick={() => navigate("/doctor")} className="flex items-center gap-4 p-3 rounded-lg cursor-pointer text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>الملف الشخصي</span>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg cursor-pointer text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          <span>الدعم</span>
        </div>
      </nav>

    </aside>
  );
} 