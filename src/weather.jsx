
            //            "User-Agent": "CitySync (dubertannica@gmail.com)", 
              //                      "Accept": "application/json",
                            
              import React, { useState, useEffect } from "react";
              import axios from "axios";
              
              const BASE_URL = "https://api.weather.gov";
              
              const WeatherDisplay = () => {
                  const [location, setLocation] = useState(null);
                  const [weatherData, setWeatherData] = useState(null);
                  const [error, setError] = useState(null);
              
                  useEffect(() => {
                      const fetchWeather = async () => {
                          if ("geolocation" in navigator) {
                              navigator.geolocation.getCurrentPosition(
                                  async (position) => {
                                      const { latitude, longitude } = position.coords;
                                      setLocation({ latitude, longitude });
              
                                      try {
                                          const gridResponse = await axios.get(`${BASE_URL}/points/${latitude},${longitude}`, {
                                              headers: {
                                                  "User-Agent": "MyWeatherApp (myemail@example.com)",
                                                  "Accept": "application/json",
                                              },
                                          });
              
                                          const { gridId, gridX, gridY } = gridResponse.data.properties;
                                          const forecastResponse = await axios.get(`${BASE_URL}/gridpoints/${gridId}/${gridX},${gridY}/forecast`, {
                                              headers: {
                                                  "User-Agent": "MyWeatherApp (myemail@example.com)",
                                                  "Accept": "application/json",
                                              },
                                          });
              
                                          setWeatherData(forecastResponse.data.properties);
                                      } catch (err) {
                                          setError("Failed to fetch weather data.");
                                      }
                                  },
                                  (err) => setError("Location access denied. Please enable GPS.")
                              );
                          } else {
                              setError("Geolocation not supported by your browser.");
                          }
                      };
              
                      fetchWeather();
                  }, []);
              
                  // Define inline styles
                  const styles = {
                      container: {
                          textAlign: "center",
                          fontFamily: "Arial, sans-serif",
                          padding: "20px",
                          background: "linear-gradient(to right, #6dd5ed, #2193b0)",
                          color: "white",
                          borderRadius: "10px",
                          width: "80%",
                          margin: "auto",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      },
                      forecastContainer: {
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "15px",
                          marginTop: "20px",
                      },
                      card: {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          padding: "15px",
                          width: "200px",
                          textAlign: "center",
                          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                      },
                      icon: {
                          width: "80px",
                          height: "80px",
                      },
                      error: {
                          color: "red",
                          fontWeight: "bold",
                      },
                  };
              
                  return (
                      <div style={styles.container}>
                          <h2>Weather Forecast</h2>
                          {error ? (
                              <p style={styles.error}>{error}</p>
                          ) : location ? (
                              <div>
                                  <p><strong>Latitude:</strong> {location.latitude} | <strong>Longitude:</strong> {location.longitude}</p>
                                  {weatherData ? (
                                      <div style={styles.forecastContainer}>
                                          {weatherData.periods.map((period) => (
                                              <div key={period.number} style={styles.card}>
                                                  <h4>{period.name}</h4>
                                                  <img src={period.icon} alt={period.shortForecast} style={styles.icon} />
                                                  <p><strong>{period.temperature}°{period.temperatureUnit}</strong></p>
                                                  <p>{period.detailedForecast}</p>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p>Loading weather data...</p>
                                  )}
                              </div>
                          ) : (
                              <p>Fetching location...</p>
                          )}
                      </div>
                  );
              };
              
              export default WeatherDisplay;
              