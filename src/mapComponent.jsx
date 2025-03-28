import React, {useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, TrafficLayer, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

//map defaults to Syracuse
  const mapCenter = { lat: 43.037916, lng: -76.131511};

//map view
  const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

//map key
  const mapKeyStyle = {
  position: "absolute",
  bottom: "50px",
  left: "20px",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  fontSize: "14px",
  zIndex: "1000",
};

//search box 
  const searchBoxStyle = {
    position: "absolute",
    top: "10px",
    left: "38%",
    transform: "translateX(-50%)",
    zIndex: "1000",
    width: "300px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

//traffic api key
  const TOMTOM_API_KEY = "3WTXMWsDnCARLkGNX7wFRw6QNNStqlUU";


function MapComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, placeMarkers] = useState([]);
  const [selectedMarker, placeSelectedMarker] = useState(null);
  const [allowMarkerPlacement, setAllowMarkerPlacement] = useState(false);
  const [trafficMarkers, setTrafficMarkers] = useState([]);
  const [showTraffic, setShowTraffic] = useState(true);
  const [searchLocation, setSearchLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [travelTime, setTravelTime] = useState("");
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [zoom, setZoom] = useState(17);
  const hoverTimeoutRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [map, setMap] = useState(null);

const recenterMap = () => { 
  if (userLocation && map) {
    console.log("Recentering to:", userLocation);
    map.setCenter(userLocation); // Move map to user's location
    map.setZoom(17); // Reset zoom level to 17
  } else {
    console.error("User location or map instance is not set.");
  }
};

//uses geolocation to get users coordinates and update it -> if user allows
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error - Location access has been denied.");
        }
      );
    }
  }, []
);


//fetches traffic data from tomtom api and updates trafficMarkers state with incident markers
//refreshes every 60 seconds
  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch(
          `https://api.tomtom.com/traffic/services/4/incidentDetails?key=${TOMTOM_API_KEY}&bbox=-76.5,42.5,-75.5,43.5&fields={incidents{geometry,type,properties{eventCode,description,iconCategory}}}`
        );
        const data = await response.json();

        if (data && data.incidents) {
          const formattedMarkers = data.incidents.map((incident, index) => ({
            id: index,
            lat: incident.geometry.coordinates[1],
            lng: incident.geometry.coordinates[0],
            description: incident.properties.description,
            severity: incident.properties.iconCategory,
          }));
          setTrafficMarkers(formattedMarkers);
        }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []
);


//uses google directions api to route from origin to destination
//upateds directions state as route
//creates estimated travel time and updates travelTime
  const calculateRoute = () => {
    if (!origin || !destination) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const duration = result.routes[0].legs[0].duration.text; // Extract duration
          setTravelTime(duration); // Update state with travel time
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
};


//determines marker color based on severity
  const getTrafficIcon = (severity) => {
    if (severity >= 1 && severity <= 2) {
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Low severity
    } else if (severity >= 3 && severity <= 4) {
      return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"; // Medium severity
    } else {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // High severity
    }
};


//adds new marker when user clicks map only when allowMarkerPlacement is true
  const mapPlacer = (event) => {
    if (!allowMarkerPlacement) return;
  
    const newMarker = {
      id: Date.now(),
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      description: "",
    };
  
    placeMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setAllowMarkerPlacement(false); // Resets after placing a marker
};


//ensures markers data is saved and updated
  const markerDescription = (event, id) => {
    placeMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, description: event.target.value } : marker
      )
    );
    
      
    placeSelectedMarker((prevSelected) =>
      prevSelected && prevSelected.id === id
        ? { ...prevSelected, description: event.target.value }
        : prevSelected
    );
};


//removes marker when delete button is clicked
  const deleteMarker = (id) => {
    placeMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));
    placeSelectedMarker(null); // Close InfoWindow after deletion

};


//retrieves places coordinates when user searches for a place
//updates map center to the searched location
  const placeSelecter = () => {
        if (autocompleteRef.current) {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry) {
            setSearchLocation({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        }
};


  return (
    <LoadScript googleMapsApiKey = "AIzaSyC1XhNpCOAv_EZfz-N_GCxf51OWwPnn4PM" libraries={["places"]}>
      <div style={{ position: "relative" }}>


        {/* Search Box */}
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={placeSelecter}>
          <input type="text" placeholder="Search a place..." style={searchBoxStyle} />
        </Autocomplete>
      <button onClick={recenterMap} style={{ position: "absolute", top: "370px", left: "19px", padding: "8px 12px", backgroundColor: "#007BFF", color: "white", borderRadius: "8px", cursor: "pointer", border: "none", zIndex: "1000" }}>Recenter Map</button>
        <div style={{ position: "absolute", top: "5px", left: "710px", zIndex: "1000", backgroundColor: "white", padding: "10px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
  <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
  <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
  <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
    <option value="DRIVING">Driving</option>
    <option value="WALKING">Walking</option>
    <option value="BICYCLING">Bicycling</option>
    <option value="TRANSIT">Transit</option>
  </select>
  <button onClick={calculateRoute}>Get Directions</button>
  <button 
    onClick={() => {
      setDirections(null);
      setTravelTime("");
      setOrigin("");
      setDestination("");
      recenterMap();
    }}
    style={{ marginLeft: "10px", backgroundColor: "#007BFF", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
  >
    Clear Results
  </button>

  {travelTime && <p>Estimated Travel Time: {travelTime}</p>}
</div>

      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        center={searchLocation || userLocation || mapCenter}
        zoom={17} // Default zoom level
        onClick={mapPlacer}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Marker at user's location if found, otherwise default */}
        <Marker position = {userLocation || mapCenter} title = "Your Location"
        icon={userLocation && window.google ? { 
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
          scaledSize: new window.google.maps.Size(40, 40) 
        } : null}
        />
        {directions && <DirectionsRenderer directions={directions} />}

      {/* Render user-added markers */}
      {markers.map((marker) => (
  <Marker
    key={marker.id}
    position={{ lat: marker.lat, lng: marker.lng }}
    onClick={() => placeSelectedMarker(marker)} // Set selected marker for editing
    onMouseOver={() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setHoveredMarker(marker);
    }}
    onMouseOut={() => {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredMarker(null);
      }, 300); // delay (300ms)
    }}
  />
))}


{hoveredMarker && (
  <InfoWindow
    position={{
      lat: hoveredMarker.lat + 0.0003,
      lng: hoveredMarker.lng,
    }}
  >
    <div>
      <p>{hoveredMarker.description || "No description available"}</p>
    </div>
  </InfoWindow>
)}

{/* Show InfoWindow when clicking (editable) */}
{selectedMarker && (
  <InfoWindow
    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
    onCloseClick={() => placeSelectedMarker(null)}
  >
    <div>
      <p>{selectedMarker.description || "No description available"}</p>
      <input
        type="text"
        placeholder="Enter description."
        value={selectedMarker.description}
        onChange={(e) => markerDescription(e, selectedMarker.id)}
      />
      <button onClick={() => deleteMarker(selectedMarker.id)}>🗑 Delete Marker</button>
    </div>
  </InfoWindow>
)}

        {/* Traffic Layer */}
        {showTraffic && <TrafficLayer />}
        
        
      </GoogleMap>

      {/* Toggle Traffic Button */}
      <button
          onClick={() => setShowTraffic(!showTraffic)}
          style={{
            position: "absolute",
            top: "10px",
            left: "200px",
            padding: "8px 12px",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            zIndex: "1000",
          }}
        >
          {showTraffic ? "Hide Traffic" : "Show Traffic"}
        </button>

        <button
  onClick={() => setAllowMarkerPlacement((prev) => !prev)}
  style={{
    position: "absolute",
    top: "55px",
    left: "200px",
    padding: "8px 12px",
    backgroundColor: allowMarkerPlacement ? "#dc3545" : "#007BFF", // Red when active, blue when inactive
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    zIndex: "1000",
  }}
>
  {allowMarkerPlacement ? "Cancel Marker" : "Add Marker"}
</button>


      {/* Legend Box (Key) */}
      <div style={mapKeyStyle}>
          <h4>Map Key</h4>
          <p>📍 <strong>Blue Marker</strong> - Your location</p>
          <p>📍 <strong>Red Marker</strong> - User added location</p>
          <p>🚦 <strong>Traffic Layer</strong> - Live traffic data</p>
          <p>✅ Click anywhere to add/edit a new marker</p>
          <p>🟢 Green - Low severity traffic</p>
          <p>🟠 Orange - Medium severity traffic</p>
          <p>🔴 Red - High severity traffic</p>
        </div>
        </div>


    </LoadScript>
  );
}

export default MapComponent;