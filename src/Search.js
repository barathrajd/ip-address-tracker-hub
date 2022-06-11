import React, { useState } from "react";
import rarrow from "./images/icon-arrow.svg";
import IpSearchAPi from "./IpSearchAPi";
import axios from "axios";

const Search = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState({
    latitude: "",
    longitude: "",
    city: "",
    country: "",
    location: "",
    timezone: "",
    isp: "",
    ip: "",
  });

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 788,
    zoom: 12,
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      axios
        .get(
          `https://geo.ipify.org/api/v1?apiKey=${
            process.env.REACT_APP_IP_SEARCH
          }&ipAddress=${value ? value : "8.8.8.8"}`
        )
        .then((res) => {
          const resData = res.data;
          if (res.code === 422) {
            alert("Invalid Syntax");
          }
          setOptions({
            ...options,
            latitude: resData.location.lat,
            longitude: resData.location.lng,
            city: resData.location.city,
            country: resData.location.country,
            region: resData.location.region,
            timezone: resData.location.timezone,
            isp: resData.isp,
            ip: resData.ip,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!value) {
      alert("Please Enter a domain");
    }
    setViewport({
      width: "100%",
      height: 788,
      latitude: 51.507351,
      longitude: -0.127758,
      zoom: 14,
      transitionDuration: 1000,
      // transitionInterpolator: new FlyToInterpolator(),
    });
  };

  return (
    <>
      <div className="search">
        <h1 className="search__header">IP Address Tracker</h1>
        <form onSubmit={submitHandler}>
          <div className="search__group">
            <input
              type="search"
              name="search"
              className="btn-search"
              placeholder="Search for any IP address or domain"
              value={value}
              onChange={handleChange}
            />
            <button type="submit">
              <img src={rarrow} alt="right-arrow" className="rarrow" />
            </button>
          </div>
        </form>
      </div>
      <IpSearchAPi viewport={viewport} options={options} />
    </>
  );
};

export default Search;
