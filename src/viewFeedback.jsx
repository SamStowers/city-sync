import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDocs} from "firebase/firestore";
import db from "./index";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  
  const dataCollection = collection(db, "userFeedback");

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
      const getFeedback = async () => {
      const querySnapshot = await getDocs(dataCollection);
      setFeedback(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
    };

    getFeedback();
  }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📢 Latest Feedback</h2>
  
        <div className="row">
          {feedback.length === 0 ? (
            <p className="text-center">No feedback yet.</p>
          ) : (
            feedback.map(feedback => (
              <div key={feedback.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card">
                  
                  <div className="card-body">
                    <h5 className="card-title">{feedback.title}</h5>
                    <p className="card-text">{formatDateFromTimestamp(feedback.timestamp)}</p>
                    <p className="card-text">{feedback.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

export default ViewFeedback;