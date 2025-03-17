import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateAnnounce = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new announcement object
    const newAnnouncement = {
      title,
      description,
      image,
      date: new Date().toISOString(),
    };

    // Save to localStorage (mimicking a backend)
    const existingAnnouncements =
      JSON.parse(localStorage.getItem("announcements")) || [];
    localStorage.setItem(
      "announcements",
      JSON.stringify([newAnnouncement, ...existingAnnouncements])
    );

    // Clear form fields
    setTitle("");
    setDescription("");
    setImage("");

    alert("Announcement created successfully!");
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