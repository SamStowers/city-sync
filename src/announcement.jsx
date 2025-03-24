import React, { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore";
import db from "./index";
import "bootstrap/dist/css/bootstrap.min.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const dataCollection = collection(db, "announcements");

  useEffect(() => {
      const getAnnouncements = async () => {
      const querySnapshot = await getDocs(dataCollection);
      setAnnouncements(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
    };

    getAnnouncements();
  }, []);



  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📢 Latest Announcements</h2>

      <div className="row">
        {announcements.length === 0 ? (
          <p className="text-center">No announcements yet.</p>
        ) : (
          announcements.map(announcement => (
            <div key={announcement.id} className="col-lg-4 col-md-6 col-sm-12 mb-4" >
              <div className="card">
              {announcement.image && (
                  <img
                    src={announcement.image}
                    className="card-img-top"
                    alt={announcement.title || "Announcement"}
                  />
                )}
                <div className="card-body" style={{textOverflow: 'ellipsis' }}>
                  <h5 className="card-title">{announcement.title}</h5>
                  <p className="card-text">{announcement.description}</p>
                  
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