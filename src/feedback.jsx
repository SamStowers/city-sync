import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Feedback() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create new announcement object
        const newFeedback = {
          title,
          description,
          //image,
          location
        };
    
        // Save to localStorage (mimicking a backend)
        const existingFeedback =
        JSON.parse(localStorage.getItem("feedback")) || [];
        localStorage.setItem("feedback",
        JSON.stringify([newFeedback, ...existingFeedback])
        );
    
        // Clear form fields
        setTitle("");
        setDescription("");
        // setImage("");
        setLocation("")
    
        alert("Feedback submitted successfully!");
      };
    



    return (
        <div className="container mt-5">
            <h2>Give us feedback!</h2>
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
    
            
                <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
        </div>
    );
}

export default Feedback;