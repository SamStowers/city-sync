import React from "react";

const AboutPage = () => {
  const styles = {
    page: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "40px",
      backgroundColor: "#f5f7fa",
      color: "#000",
      minHeight: "100vh",
    },
    header: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#2196f3",
    },
    section: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.section}>
        <h1 style={styles.header}>About City Sync</h1>
        <p style={styles.paragraph}>
          City Sync is an all in one platform designed to help residents and tourists stay connected to urban life. 
          With real-time updates on local events, weather, and traffic, City Sync empowers users to make smarter 
          decisions while navigating the city.
        </p>
        <p style={styles.paragraph}>
          The project aims to simplify city living by centralizing essential information in one place. Whether you're 
          looking for something fun to do on a weekend or trying to avoid traffic congestion and bad weather, City Sync has you covered.
        </p>
        <p style={styles.paragraph}>
          This platform was built using React, incorporating features like an interactive map, event listings, and 
          weather page. On the backend, we used Firebase to store account creation and admin-made events. We designed it with accessibility in mind to ensure it benefits all users, 
          regardless of their tech experience.
        </p>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
  <img 
    src="/citysync-logo.png" 
    alt="Group 14" 
    style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", marginBottom: "10px" }} 
  />
  <p style={{ fontSize: "1.5rem" }}>Group 14</p>
</div>


      </div>
    </div>
  );
};

export default AboutPage;