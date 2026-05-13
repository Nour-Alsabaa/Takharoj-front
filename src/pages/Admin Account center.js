import React from 'react';
import './Admin Account center.css';
import { 
  Home, 
  LayoutDashboard, 
  UserCog, 
  Activity, 
  Users, 
  Headphones, 
  User, 
  UserCheck, 
  Stethoscope 
} from 'lucide-react';
import SideBar from '../Components/SideBar';
import AdminsImage from '../images/Admins.png';
import DoctorsImage from '../images/Doctors.png';


const AccountCard = ({ icon: Icon, title, imgSrc }) => (
  <div className="account-card">
    <div className="card-icon">
      {imgSrc ? (
        <img src={imgSrc} alt={title} style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
      ) : (
        <Icon size={120} strokeWidth={1} />
      )}
    </div>
    <h3 className="card-title">{title}</h3>
  </div>
);



const AccountAdminCenter = () => {
  return (
    <div className="AccountAdminCenter" dir="rtl">
      {/* القائمة الجانبية المستوردة */}
      <SideBar />

      {/* المحتوى الرئيسي */}
      <main className="main-content">
        <div className="bg-shape top-shape"></div>
        <div className="bg-shape bottom-shape"></div>

        <header className="header">
          <h1>مدير الحسابات</h1>
        </header>

        <div className="cards-grid">
          <AccountCard imgSrc={DoctorsImage} title="الأطباء" />
          <AccountCard imgSrc={AdminsImage} title="المسؤولين" />
          <AccountCard icon={User} title="الملف الشخصي" />
        </div>
      </main>
    </div>
  );
};

export default AccountAdminCenter;