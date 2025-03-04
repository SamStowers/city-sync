import { createRoot } from "react-dom/client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Announcement from "./announcement";
import Report from "./report";
import Feedback from "./feedback";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
const root = createRoot(document.getElementById("root"))


function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">City Sync</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/announcement">Announcement</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/report">Report</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/feedback">Feedback</Link>
                        </li>
                    </ul>
                    <form role="search">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </div>
        </nav>
    )
}

function SignIn() {
    return(
        <main className="form-signin w-100 m-auto">
            <form>
                {/* <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2025–2025</p>
            </form>
        </main>
    )
}

const announcementsData = [
    {
        title: "Concert",
        description: "Concert on March 2nd",
        image: "/calendar.png"
    },
    {
        title: "Soccer Game",
        description: "Soccer Game on March 2nd.",
        image: "/calendar.png"
    }
  ]

root.render(
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SignIn style={{ maxWidth: '400px', width: '100%' }} />
                    </div>
                </div>
            } />
            <Route path="/announcement" element={<Announcement announcements={announcementsData} />} />
            <Route path="/report" element={<Report />} />
            <Route path="/feedback" element={<Feedback />} />
        </Routes>
    </Router>
)
