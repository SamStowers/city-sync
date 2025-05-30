import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getUserAdminFromUID } from './userFunctions';

function Navbar() {
    // See if a user is signed in
    const auth = getAuth();
    const [curUser, setCurUser] = useState('Guest');
    const [curUID, setCurUID] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [reloadUser, setReloadUser] = useState(false);
    const navigate = useNavigate();

    // Runs on initial load, to see if the user is an admin
    useEffect(() => {
        async function updateAdminStatus() {
            try {
                const adminStatus = await getUserAdminFromUID(curUID);
                setIsAdmin(adminStatus);
            }
            catch (error) { console.log(error) }
            finally {
                setReloadUser(false);
            }
        }

        updateAdminStatus();
    }, [reloadUser])

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setCurUser(user.email);
        // Fetch whether they are admin
        setCurUID(user.uid);
        setReloadUser(true);
    } else {
        // User is signed out
        setCurUser('Guest');
        setCurUID('0');
        setIsAdmin(false);
    }
    });

    const handleClick = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
        // Sign-out successful.
            setReloadUser(true);
            navigate('/');
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">City Sync</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signinPage">Sign In</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/announcement">Announcement</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/map">Map</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/report">Report</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback">Feedback</Link>
                        </li>
                        {true && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                        )}
                    </ul>
                    {/* <form role="search">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    </form> */}
                    {isAdmin && (
                        <p style={{ color: 'red' }}>ADMINISTRATOR </p>
                    )}
                    <p style={{ color: 'white' }}>Current User: {curUser} </p>
                    <button onClick={handleClick}>Sign Out</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;