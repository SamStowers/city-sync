import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Load announcements from localStorage
    const savedAnnouncements =
      JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(savedAnnouncements);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📢 Latest Announcements</h2>

      <div className="row">
        {announcements.length === 0 ? (
          <p className="text-center">No announcements yet.</p>
        ) : (
          announcements.map((announcement, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <img
                  src={announcement.image}
                  className="card-img-top"
                  alt="Announcement"
                />
                <div className="card-body">
                  <h5 className="card-title">{announcement.title}</h5>
                  <p className="card-text">{announcement.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Posted on {new Date(announcement.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;