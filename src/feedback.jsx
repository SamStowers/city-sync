import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Feedback() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        image: null
    });
    
    return (
        <div className="container mt-5">
            <h2>Give us feedback!</h2>
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
                <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
        </div>
    );
}

export default Feedback;