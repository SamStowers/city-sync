import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  
    useEffect(() => {
      // Load announcements from localStorage
      const savedFeedback=
        JSON.parse(localStorage.getItem("feedback")) || [];
      setFeedback(savedFeedback);
    }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📢 Latest Feedback</h2>
  
        <div className="row">
          {feedback.length === 0 ? (
            <p className="text-center">No reports yet.</p>
          ) : (
            feedback.map((feedback, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card">
                  
                  <div className="card-body">
                    <h5 className="card-title">{feedback.title}</h5>
                    <p className="card-text">{feedback.description}</p>
                    <p className="card-text">{feedback.location}</p>
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