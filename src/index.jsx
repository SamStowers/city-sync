import { createRoot } from "react-dom/client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Announcement from "./announcement";
import Report from "./report";
import Feedback from "./feedback";
import SignIn from "./signIn.jsx";
import CreateAccount from "./createAcc.jsx";
import Navbar from "./navbar.jsx"
import ViewReport from "./viewReports.jsx"
import CreateAnnounce from "./createAnnouncement.jsx"
import ViewFeedback from "./viewFeedback.jsx"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from "firebase/firestore";

const root = createRoot(document.getElementById("root"))

// Firebase configuration settings
// https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyD_263Ydx78CRy1uqiIvORtUM3RC2vm0ZM",
    authDomain: "city-sync-d9c13.firebaseapp.com",
    projectId: "city-sync-d9c13",
    storageBucket: "city-sync-d9c13.firebasestorage.app",
    messagingSenderId: "609922993428",
    appId: "1:609922993428:web:622fd89ef519f8b5ad8601"
};  

// Initialize Firebase
// Note that to test these features on a local machine,
// you must use a Firebase emulator, more info here:
// https://firebase.google.com/docs/emulator-suite
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



root.render(
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={
                <p>Homepage :)</p>
            } />
            <Route path="/signinPage" element={
            <div>
                <SignIn />
                <CreateAccount />
            </div>
            } />
            <Route path="/announcement" element={<Announcement  />} />
            <Route path="/report" element={<Report />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/admin" element={
            <div>
                <CreateAnnounce />
                <ViewReport />
                <ViewFeedback />
            </div>
            }  />
        </Routes>
    </Router>
);
export default db;
