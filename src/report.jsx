import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, addDoc } from "firebase/firestore";
import db from "./index";
import { getUserReportPermission } from "./userFunctions";
import { getUserUID, getUserEmail } from "./userFunctions";

function Report() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    const [location, setLocation] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     // Create new announcement object
    //     const newReport = {
    //       title,
    //       description,
    //       //image,
    //       location
    //     };
        
    
    //     // Save to localStorage (mimicking a backend)
    //     const existingReports =
    //     JSON.parse(localStorage.getItem("reports")) || [];
    //     localStorage.setItem("reports",
    //     JSON.stringify([newReport, ...existingReports])
    //     );
    
    //     // Clear form fields
    //     setTitle("");
    //     setDescription("");
    //     // setImage("");
    //     setLocation("")
    
    //     alert("Report created successfully!");
    //   };
    
    // Upload to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        var curReportPerm = await getUserReportPermission();
        if (!curReportPerm) {
            alert("You must be logged in to submit a report, or you do not have permission.")
        } else {
        try {
          const docRef = await addDoc(collection(db, "reports"), {
            title: title,
            description: description,
            location: location,
            timestamp: new Date(), // Add a timestamp for when the report was submitted
            submitteruid: getUserUID(),
            submitteremail: getUserEmail()
          });
          console.log("Document written with ID: ", docRef.id);
          alert("Report created successfully!");

          setTitle("");
        setDescription("");
        setLocation("");

          return docRef.id; // Return the document ID if needed
        } catch (err) {
          console.error("Error adding document: ", e);
          throw err; // Rethrow the error for handling in the calling context
        }
        }
      };

    return (
        <div className="container mt-5">
            <h2>Report an Issue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Report</button>
            </form>
        </div>
    );
}

export default Report;