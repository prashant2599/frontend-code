"use client"
import DashboardSearch from "./DashboardSearch";
import { useUser } from "@/app/UserContext";

const DashboardTop = () => {
  const { userData } = useUser();
  const displayText =
    userData && userData.name
      ? `Hi ${
          userData.name.split(" ")[0].charAt(0).toUpperCase() +
          userData.name.split(" ")[0].slice(1)
        }`
      : null;

  return (
    <>
      <div className="home-topbox">
        <div className="topbox-left">
          <h1>{displayText}</h1>
          <h2>Welcome to Medflick!</h2>
        </div>
        <DashboardSearch />
      </div>
    </>
  );
};

export default DashboardTop;
