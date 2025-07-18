import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PatientProfile = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div className="bg-white rounded-lg border p-6 max-w-xl mx-auto mt-8">
      <h2 className="font-semibold text-lg mb-2">My Profile</h2>
      <div className="text-gray-700 mb-2">Username: <span className="font-bold">{user}</span></div>
      <div className="text-gray-700 mb-2">Role: <span className="font-bold">{role}</span></div>
      <div className="text-gray-500 text-sm mt-4">(Profile details coming soon...)</div>
    </div>
  );
};

export default PatientProfile; 