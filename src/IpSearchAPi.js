import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapBox from './MapBox';

const IpSearchAPi = ({ ipAddress, viewport }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://geo.ipify.org/api/v1?apiKey=${
          process.env.REACT_APP_IP_SEARCH
        }&ipAddress=${ipAddress ? ipAddress : '8.8.8.8'}`
      );
      const resData = await res.data;
      if (res.code === 422) {
        alert('Invalid Syntax');
      }
      setLatitude(resData.location.lat);
      setLongitude(resData.location.lng);
      setCity(resData.location.city);
      setCountry(resData.location.country);
      setLocation(resData.location.region);
      setTimezone(resData.location.timezone);
      setIsp(resData.isp);
      setIp(resData.ip);
    };

    fetchData();
  }, [ipAddress]);

  return (
    <div className='ipsearch'>
      <div className='output'>
        <div className='output__group'>
          <p>ipaddress</p>
          <div className='output__text'>{ip ? ip : '8.8.8.8'}</div>
        </div>
        <div className='output__group'>
          <p>location</p>
          <div className='output__text'>
            {location ? location : 'California'}
          </div>
        </div>
        <div className='output__group'>
          <p>timezone</p>
          <div className='output__text'>
            {timezone ? `UTC ${timezone}` : 'UTC-07:00'}
          </div>
        </div>
        <div className='output__group'>
          <p>isp</p>
          <div className='output__text'>{isp ? isp : 'Google LLC'}</div>
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
            width: '100%',
            height: 788,
            zoom: 12,
          })
        }
      />
    </div>
  );
};

export default IpSearchAPi;
