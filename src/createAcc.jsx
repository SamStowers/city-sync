import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import db from "./index";

// Async function to create all the new data corresponding to the new account
// Stored in Firestore
// setDoc will create a new document if it does not exist already
async function createUser(newUid, newEmail) {
  await setDoc(doc(db, "users", newUid), {
    uid: newUid,
    email: newEmail,
    admin: false,
    feedbackPermission: true,
    reportPermission: true,
  });
}

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        setPasswordMismatch(false);
        setServerError(false);
        setSuccess(false);

        if (password !== confirmPassword) {
        setPasswordMismatch(true); // Set mismatch flag
        setSuccess(false);
        return; // Stop further processing
        }

        // For testing, printing to console
        // console.log('Email:', email);
        // console.log('Password:', password);
        // console.log('Confirm Password:', confirmPassword);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // Add user data to Firestore
            createUser(user.uid, user.email);
            // Update success, showing a success message to the user
            setSuccess(true);
          })
          .catch((error) => {
            const errorCode = error.code;
            setErrorMessage(error.message);
            console.log(errorCode);
            console.log(errorMessage);
            setServerError(true);
          });

        // Clear the form after submission
        // setEmail(''); don't clear the email
        setPassword('');
        setConfirmPassword('');
    };
  
    return (
      // Commented out was the test basic html

      // <form onSubmit={handleSubmit}>
      //   <h1>Create account</h1>
      //   <div>
      //     <label htmlFor="email">Email:</label>
      //     <input
      //       type="email"
      //       id="email"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="password">Password:</label>
      //     <input
      //       type="password"
      //       id="password"
      //       value={password}
      //       onChange={(e) => setPassword(e.target.value)}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="confirmPassword">Confirm Password:</label>
      //     <input
      //       type="password"
      //       id="confirmPassword"
      //       value={confirmPassword}
      //       onChange={(e) => setConfirmPassword(e.target.value)}
      //     />
      //   </div>
      //   <button type="submit">Create Account</button>
      //   {passwordMismatch && (
      //   <p style={{ color: 'red' }}>Passwords do not match.</p>
      // )}
      // {serverError && errorMessage && (
      //   <p style={{ color: 'red' }}>{errorMessage}</p>
      // )}
      // {success && (
      //   <p style={{ color: 'green' }}>Success. Account created</p>
      // )}
      // </form>
      <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Create Account</h1>

                <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Create Account</button>
                {passwordMismatch && (
                  <p style={{ color: 'red' }}>Passwords do not match.</p>
                )}
                {serverError && errorMessage && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                {success && (
                  <p style={{ color: 'green' }}>Success. Account created</p>
                )}
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2025–2025</p>
            </form>
        </main>
    );
}

export default CreateAccount;