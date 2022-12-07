import React, { useEffect, useState } from 'react';
import { WbSunny } from '@mui/icons-material';

const Weather = (props) => {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);

    const [name, setName] = useState("Loading...");
    const [temp, setTemp] = useState("Loading...");
    const [desc, setDesc] = useState("Loading...");


    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`${process.env.REACT_APP_WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    if (result.main.temp) {
                        setName(result.name);
                        setTemp(result.main.temp);
                        setDesc(result.weather[0].description);
                    }
                    console.log(result);
                });
        }
        fetchData();
    }, [lat, long]);

    return (
        <div className='grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 sm:items-center content-center'>
            <div className='xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1 p-2 ml-4 content-center'>
                <WbSunny sx={{ fontSize: 64 }} />
            </div>
            <div className='xs:col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-5'>
                <div className='text-base'>{name}</div>
                <div className='text-3xl'>{temp}°C</div>
                <div className='text-base'>{desc}</div>
            </div>
        </div>
    );
}

export default Weather;