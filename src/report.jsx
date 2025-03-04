import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Report() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        image: null
    });
    
    return (
        <div className="container mt-5">
            <h2>Report an Issue</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Title"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        placeholder="Description"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="Location"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Image (Optional)</label>
                    <input
                        type="file"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Report</button>
            </form>
        </div>
    );
}

export default Report;