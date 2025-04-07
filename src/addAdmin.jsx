import React, { useState } from "react";
// import db from "./index";
// import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { setUserAdmin } from "./userFunctions";

function AddAdmin(){
  const [newUID, setNewUID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Give the associated UID permission
    try {
        setUserAdmin(true, newUID);
        alert("User given admin permissions")
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Give Administrator Permissions</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">UID of new admin</label>
          <input
            type="text"
            className="form-control"
            value={newUID}
            onChange={(e) => setNewUID(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add new admin
        </button>
      </form>
    </div>
    
  );
};

export default AddAdmin;