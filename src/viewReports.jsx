import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  
    useEffect(() => {
      // Load announcements from localStorage
      const savedReports=
        JSON.parse(localStorage.getItem("reports")) || [];
      setReports(savedReports);
    }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📢 Latest Reports</h2>
  
        <div className="row">
          {reports.length === 0 ? (
            <p className="text-center">No reports yet.</p>
          ) : (
            reports.map((report, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card">
                  
                  <div className="card-body">
                    <h5 className="card-title">{report.title}</h5>
                    <p className="card-text">{report.description}</p>
                    <p className="card-text">{report.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

export default ViewReport;
    