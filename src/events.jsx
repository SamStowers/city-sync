import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("your area");
  const [isAdmin, setIsAdmin] = useState(true);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
    image: null // Store image file
  });

  const [previewImage, setPreviewImage] = useState(null); // Preview Image

  const API_KEY = "HU62VBI54VOE3B33ABLY";

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await reverseGeocode(latitude, longitude);
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

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const cityName = response.data.address.city || response.data.address.town || response.data.address.village;
      setCity(cityName);
      fetchEvents(cityName);
    } catch (error) {
      console.error("Error getting city name:", error);
      setLoading(false);
    }
  };

  const fetchEvents = async (cityName) => {
    try {
      const response = await axios.get(
        `https://www.eventbriteapi.com/v3/events/search/?location.address=${cityName}&token=${API_KEY}`
      );
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent({ ...newEvent, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date || !newEvent.description) {
      alert("Please fill in all fields.");
      return;
    }

    const newEventData = {
      id: Math.random().toString(),
      name: { text: newEvent.name },
      start: { utc: newEvent.date },
      description: { text: newEvent.description },
      image: previewImage // Store preview URL (for now)
    };

    setEvents([newEventData, ...events]);
    setNewEvent({ name: "", date: "", description: "", image: null });
    setPreviewImage(null);
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading events near you...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Events in {city}</h2>

      {isAdmin && (
        <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid black" }}>
          <h3>Post a New Event</h3>
          <form onSubmit={handleAddEvent}>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={handleInputChange}
              required
              style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
            />
            <input
              type="datetime-local"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
              style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
              style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%", height: "60px" }}
            ></textarea>

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
            />
            
            {/* Preview Image */}
            {previewImage && (
              <div style={{ marginTop: "10px" }}>
                <p>Preview:</p>
                <img src={previewImage} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              </div>
            )}

            <button type="submit" style={{ padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
              Add Event
            </button>
          </form>
        </div>
      )}

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <strong>{event.name.text}</strong>
              <p>🕒 {new Date(event.start.utc).toLocaleString()}</p>
              <p>{event.description.text}</p>
              {event.image && <img src={event.image} alt="Event" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsScreen;


