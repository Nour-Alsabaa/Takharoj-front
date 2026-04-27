import React from "react";
import "./accounts_manager.css";
import SideBar from "../Components/SideBar.js";
import { useNavigate } from "react-router-dom";

export default function AccountsManager() {
  const navigate = useNavigate();

  return (
    <div className="accounts_manager_container">
        <div className="accounts_manager_left">
            <h1>مدير الحسابات</h1>
            <div className="accounts_manager_purple_line">
                
            </div>
            <div className="accounts_manager_stats">

                <div className="accounts_manager_card" onClick={() => navigate("/doctor")}>
                  <div className="accounts_manager_icon_circle">
                  <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <p>الأطباء</p>
                </div>

                <div className="accounts_manager_card" onClick={() => navigate("/admins-profiles")}>
                  <div className="accounts_manager_icon_circle">
                  <i className="fa-solid fa-users-gear"></i>
                  </div>
                  <p>المسؤولين</p>
                </div>

                <div className="accounts_manager_card"  onClick={() => navigate("/admin-profile")}>
                  <div className="accounts_manager_icon_circle">
                  <i className="fa-solid fa-user"></i>
                  </div>
                  <p>ملفي الشخصي </p>
                </div>

            </div>
        </div>

        <div className="accounts_manager_right">
          <SideBar role="admin" />
        </div>
    </div>
  );
}