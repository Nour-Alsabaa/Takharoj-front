import React from "react";
import './create_account_admin.css';
export default function CreateAccountAdminPowersManagement(){

    return(
            <div className="create-account-admin-container"  dir="ltr">
              <div className="create-account-admin-left">
                <form className="create-account-admin-form">
                    <h3 className="create-account-admin-h3">إنشاء حساب جديد</h3>
                    <h4 className="create-account-admin-step2-h4">إدارة الصلاحيات</h4>
                    <div className="create-account-admin-checkbox-container">
                      <label htmlFor="admin" className="create-account-admin-checkbox-span"> إنشاء حسابات مسؤولين</label>
                      <input
                      type="checkbox"
                      id="permission1"
                      name="admin"
                      className="create-account-admin-checkbox"
                      /> 
                   </div>

                   <div className="create-account-admin-checkbox-container">
                      <label htmlFor="admin" className="create-account-admin-checkbox-span"> إنشاء حسابات أطباء</label>
                      <input
                      type="checkbox"
                      id="permission2"
                      name="admin"
                      className="create-account-admin-checkbox"
                      />
                   </div>

                   <div className="create-account-admin-checkbox-container">
                      <label htmlFor="admin" className="create-account-admin-checkbox-span"> الرد على الدعم</label>
                      <input
                      type="checkbox"
                      id="permission3"
                      name="admin"
                      className="create-account-admin-checkbox"
                      />
                   </div>
                   <button className="create-account-admin-step2-submit" type="button"> إنشاء الحساب </button>
                  
                </form>
              </div>
        
              <div className="create-account-admin-right">
                  <img className='syria-logo-create-account-admin-logo' src="../images/Emblem_of_Syria_(2025–present).svg.png" alt="My Image" />
                  <h1 className="create-account-admin-title">الجمهورية العربية السورية</h1>
                  <h4 className="create-account-admin-sub">وزارة الصحة - منصة التنبؤ بالأوبئة</h4>
              </div>
            </div>
          );}
        
          
        
        
        
        