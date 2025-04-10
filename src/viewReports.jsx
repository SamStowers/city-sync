import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDocs} from "firebase/firestore";
import db from "./index";

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const dataCollection = collection(db, "reports");

  // Firebase stores time in it's own format. This converts from that to M/D/Y
  function formatDateFromTimestamp(timestamp) {
    if (!timestamp || !timestamp.toDate) {
      return "Invalid timestamp";
    }
  
    const date = timestamp.toDate();
    const month = date.toLocaleString('en-US', { month: 'long' }); // Full month name
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${month} ${day}, ${year}`;
  }

  // On load, get the db from firestore
  useEffect(() => {
      const getReports = async () => {
      const querySnapshot = await getDocs(dataCollection);
      setReports(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
    };

    getReports();
  }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📢 Latest Reports</h2>
  
        <div className="row">
          {reports.length === 0 ? (
            <p className="text-center">No reports yet.</p>
          ) : (
            reports.map(report => (
              <div key={report.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card">
                  
                  <div className="card-body">
                    <h5 className="card-title">{report.title}</h5>
                    <p className="card-text">{formatDateFromTimestamp(report.timestamp)}</p>
                    <p className="card-text">{report.description}</p>
                    <p className="card-text">Location: {report.location}</p>
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
    