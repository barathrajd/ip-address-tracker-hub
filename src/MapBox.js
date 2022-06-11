import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapBox = ({ latitude, longitude, city, country, viewport }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setShowPopup(false);
      }
    };
    window.addEventListener("keydown", listener);
  }, [change, viewport]);

  return (
    <div className="map">
      <ReactMapboxGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(e) => setChange(e)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={latitude} longitude={longitude}>
          <button
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <i className="fas fa-map-marker-alt"></i>
          </button>
        </Marker>
        {showPopup ? (
          <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            {city && country && (
              <h1
                style={{
                  padding: "1rem",
                  fontFamily: "inherit",
                }}
              >
                {city}, {country}
              </h1>
            )}
          </Popup>
        ) : null}
      </ReactMapboxGl>
    </div>
  );
};

export default MapBox;
