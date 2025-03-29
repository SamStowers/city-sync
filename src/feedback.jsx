import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, addDoc } from "firebase/firestore";
import { getUserFeedbackPermission } from "./userFunctions";
import { getUserUID, getUserEmail } from "./userFunctions";
import db from "./index";

function Feedback() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    // const [location, setLocation] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create new announcement object
        // const newFeedback = {
        //   title,
        //   description,
        //   //image,
        //   location
        // };
    
        // // Save to localStorage (mimicking a backend)
        // const existingFeedback =
        // JSON.parse(localStorage.getItem("feedback")) || [];
        // localStorage.setItem("feedback",
        // JSON.stringify([newFeedback, ...existingFeedback])
        // );
        var curFeedbackPerm = await getUserFeedbackPermission();
        if (!curFeedbackPerm) {
            alert("You must be logged in to submit feedback, or you do not have permission.")
        } else {
        try {
            const docRef = await addDoc(collection(db, "userFeedback"), {
              title: title,
              description: description,
            //   location: location,
              timestamp: new Date(), // Add a timestamp for when the report was submitted
              submitteruid: getUserUID(),
              submitteremail: getUserEmail() 
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Report created successfully!");
  
            setTitle("");
            setDescription("");
            // setLocation("");
  
            return docRef.id; // Return the document ID if needed
          } catch (err) {
            console.error("Error adding document: ", e);
            throw err; // Rethrow the error for handling in the calling context
          }
        }
    
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