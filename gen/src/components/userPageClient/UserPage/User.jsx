import { useState } from "react";
import './style.css';
import LogoutView from "./logout";

const navItems = [
    { name: "Home", icon: "bi-house", key: "home" },
    { name: "Dashboard", icon: "bi-speedometer2", key: "dashboard" },
    { name: "Settings", icon: "bi-gear", key: "settings" },
    { name: "Profile", icon: "bi-person", key: "profile" },
    { name: "Log out", icon: "bi bi-box-arrow-right", key:"Logout"}
];

const UserDashboard = () => {
    const [collapsed, setCollapsed] = useState(true); // sidebar collapsed by default
    const [activeTab, setActiveTab] = useState("home"); // default tab content

    const toggleSidebar = () => setCollapsed(!collapsed);

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return <div>Home </div>;
            case "dashboard":
                return <div><h4>Dashboard</h4><p>This is your dashboard.</p></div>;
            case "settings":
                return <div><h4>Settings</h4><p>Adjust your preferences here.</p></div>;
            case "profile":
                return <div><h4>Profile</h4><p>View and edit your profile.</p></div>;
            case "Logout":
                return <div> <LogoutView /></div>
            default:
                return <div><p>Select a tab to get started.</p></div>;
        }
    };

    return (
        <div className="d-flex pt-5 mt-5">
            <div className={`sidebar bg-light ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-header text-start ms-3 py-3">
                    <button className="btn border-0 btn-outline-secondary btn-sm" onClick={toggleSidebar}>
                        <i className={`bi ${collapsed ? "bi bi-caret-right-fill" : "bi bi-caret-left-fill"}`}></i>
                    </button>
                </div>
                <ul className="nav nav-pills flex-column text-center text-md-start">
                    {navItems.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <button
                                className={`nav-link d-flex align-items-center ${activeTab === item.key ? "active" : ""}`}
                                onClick={() => setActiveTab(item.key)}
                                style={{ border: "none", background: "none", textAlign: "left", width: "100%" }}
                            >
                                <i className={`bi ${item.icon} me-2 text-dark bg-info-active`} style={{ fontSize: "1.2rem" }}></i>
                                    {!collapsed && <span className="text-dark">{item.name}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="content p-3 flex-grow-1">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserDashboard;
