import React, { useState } from "react";
import db from "./index";
import { collection, addDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";


function CreateAnnounce(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new announcement object
    try {
      // Create a new announcement document in Firestore
       await addDoc(collection(db, "announcements"), {
        title: title,
        description: description,
        image: image,
        // date: new Date().toISOString(),
      });
      alert("Announcement created successfully!");
      // Clear form fields
      setTitle("");
      setDescription("");
      setImage("");

      
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📝 Create Announcement</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Post Announcement
        </button>
      </form>
    </div>
    
  );
};

export default CreateAnnounce;