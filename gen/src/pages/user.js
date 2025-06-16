import UserDashboard from "../components/userPageClient/UserPage/User";


const UserPanel =() =>{
    return(
        <>
        <UserDashboard />
        </>
    )
}

export default UserPanel;

import React, { useState } from "react";

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <div>Welcome to the Home tab!</div>;
      case "profile":
        return <div>This is your Profile.</div>;
      case "settings":
        return <div>Adjust your Settings here.</div>;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default TabbedInterface;