import React from "react";
import MapComponent from "./mapComponent";
import Events from "./events";


const Homepage = () => {
  const styles = {
    homepage: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
      backgroundColor: "#f5f7fa",
      color: "#333",
    },
    hero: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "linear-gradient(to right, #00bcd4, #2196f3)",
      padding: "50px 30px",
      color: "white",
      borderRadius: "12px",
      flexWrap: "wrap",
    },
    heroText: {
      maxWidth: "500px",
      marginBottom: "20px",
    },
    h1: {
      fontSize: "3rem",
      marginBottom: "15px",
    },
    p: {
      fontSize: "1.2rem",
      marginBottom: "20px",
    },
    description: {
      margin: "50px 0 30px",
      textAlign: "center",
    },
    h2: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    features: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "40px",
      marginBottom: "50px",
    },
    card: {
      backgroundColor: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "20px",
      flex: 1,
      minWidth: "300px",
      maxWidth: "1500px",
    },
  };

  return (
    <div style={styles.homepage}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.h1}>Navigate smarter, explore better.</h1>
          <p style={styles.p}>
            City Sync helps you stay in tune with your city with real time updates.
          </p>
        </div>
        <div>
          <img
            src="/citysync-logo.png"
            alt="City Sync logo"
            style={{ maxWidth: "250px", borderRadius: "8px" }}
          />
        </div>
      </section>

      {/* Description */}
      <section style={styles.description}>
        <h2 style={styles.h2}>What is City Sync?</h2>
        <p style={styles.p}>
          City Sync is your one stop platform for navigating life in the city.
          Whether you're checking out local events, or staying informed about
          traffic, City Sync helps keeps you connected
          and in control.
        </p>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <div style={styles.card}>
          <h3>🗺 Interactive Map</h3>
          <MapComponent />
        </div>
        <div style={styles.card}>
          <h3>📅 Upcoming Events</h3>
          <Events />
        </div>
      </section>
    </div>
  );
};

export default Homepage;