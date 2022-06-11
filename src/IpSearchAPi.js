import React from "react";
import MapBox from "./MapBox";

const IpSearchAPi = ({ viewport, options }) => {
  const { latitude, longitude, city, country, location, timezone, isp, ip } =
    options;
  return (
    <div className="ipsearch">
      <div className="output">
        <div className="output__group">
          <p>ipaddress</p>
          <div className="output__text">{ip ? ip : "8.8.8.8"}</div>
        </div>
        <div className="output__group">
          <p>location</p>
          <div className="output__text">
            {location ? location : "California"}
          </div>
        </div>
        <div className="output__group">
          <p>timezone</p>
          <div className="output__text">
            {timezone ? `UTC ${timezone}` : "UTC-07:00"}
          </div>
        </div>
        <div className="output__group">
          <p>isp</p>
          <div className="output__text">{isp ? isp : "Google LLC"}</div>
        </div>
      </div>
      <MapBox
        latitude={Number(latitude)}
        longitude={Number(longitude)}
        city={city}
        country={country}
        viewport={
          (viewport = {
            latitude: Number(latitude),
            longitude: Number(longitude),
            width: "100vw",
            height: "100vh",
            zoom: 12,
          })
        }
      />
    </div>
  );
};

export default IpSearchAPi;
