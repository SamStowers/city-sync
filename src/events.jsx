import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");

  const API_KEY = "1ZjExXeojGr1cAgRWh0h4AOVAtdT6zsx";

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
          fetchEvents(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
      setLoading(false);
    }
  };

  const fetchEvents = async (lat, lon) => {
    try {
      console.log(`Fetching events for coordinates: ${lat}, ${lon}`);
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lon}&apikey=${API_KEY}`
      );
      console.log("API Response:", response.data);

      if (response.data._embedded && response.data._embedded.events) {
        const sortedEvents = response.data._embedded.events.sort(
          (a, b) => new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime)
        );
        setEvents(sortedEvents);
      } else {
        console.warn("No events found.");
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading events near you...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Events Near You</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <strong>{event.name}</strong>
              <p>🕒 {event.dates?.start?.dateTime ? new Date(event.dates.start.dateTime).toLocaleString() : "Date not available"}</p>
              <p>{event.info || "No description available"}</p>
              {event.images && event.images.length > 0 && (
                <img src={event.images[0].url} alt="Event" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsScreen;


