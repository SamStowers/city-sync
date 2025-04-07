import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [curUID, setCurUID] = useState('');

    // Runs on initial load, to get the UID if the user is already logged in
    useEffect(() => {
        const auth = getAuth();
        if (auth.currentUser) {
            setCurUID(auth.currentUser.uid);
        }
    }, [])

    const handleSubmit = (event) => {
            event.preventDefault(); // Prevent default form submission
    
            setErrorMessage('');
    
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setSuccess(true);
                setErrorMessage('');
                setCurUID(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                setErrorMessage(error.message);
                console.log(errorCode);
                console.log(errorMessage);
                setSuccess(false);
            });
            
            // Clear the form after submission
            // setEmail(''); don't clear the email
            setPassword('');
        };

    return(
        <main className="form-signin w-100 m-auto">
            {curUID && (
                <p class="text-left">UID: {curUID}</p>
            )}            
            <form onSubmit={handleSubmit}>
                {/* <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="signInEmail"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="signInEmail">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="signInPass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="signInPass">Password</label>
                </div>

                {/* <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div> */}
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                {errorMessage && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                {success && (
                  <p style={{ color: 'green' }}>Success. Logged In</p>
                )}
            </form>
        </main>
    )
}

export default SignIn;