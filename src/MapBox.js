import React, { useState, useEffect } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;

const MapBox = ({ latitude, longitude, city, country, viewport }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
      }
    };
    window.addEventListener('keydown', listener);
  }, [change, viewport]);

  return (
    <div className='map'>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(e) => setChange(e)}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <Marker latitude={latitude} longitude={longitude}>
          <button
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <i className='fas fa-map-marker-alt'></i>
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
                  padding: '1rem',
                  fontFamily: 'inherit',
                }}
              >
                {city}, {country}
              </h1>
            )}
          </Popup>
        ) : null}
      </MapGL>
    </div>
  );
};

export default MapBox;
