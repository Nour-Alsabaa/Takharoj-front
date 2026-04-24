import React from 'react';
import SideBar from '../Components/SideBar';
import MapArea from '../Components/MapArea';

// استيراد ملف التنسيق
import './Admin_Main.css';

const Admin_Main = () => {
  return (
    <div dir="rtl" className="admin-main-container">
      
      {/* القائمة الجانبية المستوردة */}
      <SideBar />
      
      {/* مساحة الخريطة المركزية المستوردة */}
      <div className="flex-grow relative overflow-hidden">
        <MapArea />
      </div>
      
    </div>
  );
}

export default Admin_Main;
