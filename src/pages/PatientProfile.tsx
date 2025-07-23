const PatientProfile = () => {
  // REMOVE ALL REDUX HOOKS AND AUTH LOGIC
  
  return (
    <div className="bg-white rounded-lg border p-6 max-w-xl mx-auto mt-8">
      <h2 className="font-semibold text-lg mb-2">My Profile</h2>
      <div className="text-gray-700 mb-2">Username: <span className="font-bold">Placeholder</span></div>
      <div className="text-gray-700 mb-2">Role: <span className="font-bold">Placeholder</span></div>
      <div className="text-gray-700 mb-2">Email: <span className="font-bold">Placeholder</span></div>
      <div className="text-gray-500 text-sm mt-4">(Profile details coming soon...)</div>
    </div>
  );
};

export default PatientProfile; 