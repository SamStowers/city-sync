import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Report() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create new announcement object
        const newReport = {
          title,
          description,
          //image,
          location
        };
        
    
        // Save to localStorage (mimicking a backend)
        const existingReports =
        JSON.parse(localStorage.getItem("reports")) || [];
        localStorage.setItem("reports",
        JSON.stringify([newReport, ...existingReports])
        );
    
        // Clear form fields
        setTitle("");
        setDescription("");
        // setImage("");
        setLocation("")
    
        alert("Report created successfully!");
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