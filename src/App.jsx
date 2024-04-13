import { useEffect, useState } from "react";


export default function App() {
  const [coords, saveCoords] = useState();
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();
  const [cityname, setCityname] = useState();

  
      
     function handleGeoSucc(position) {
      console.log(position);
      const latitude = position.coords.latitude;  // 경도  
      const longitude = position.coords.longitude;  // 위도
      const coordsObj = {
        latitude,
        longitude
      }
      saveCoords(coordsObj);
      getWeather(latitude, longitude);
    }
  
    function handleGeoErr(err) {
      console.log("geo err! " + err);
    }
  
    function requestCoords() {
      navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }
  
    function getWeather(lat, lon) {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const temp = data.main.temp;
          const weathers = data.weather[data.weather.length - 1];
          const cityname = data.name;
          setTemp(temp);
          setWeather(weathers.main);
          setCityname(cityname);
        })
    }
  
    useEffect(() => {
      requestCoords();
    }, []);

    return (
              <>
                  <p>React기반 날씨 데이터 연동 어플리케이션</p>
                  <hr/>
                  <button onClick={requestCoords}>서버에서 날씨 데이터 가져오기</button>
                  <p>날씨 목록</p>
                  <li>도시 : {cityname}</li>
                  <li>온도 : {temp}</li>
                  <li>날씨 : {weather}</li>
              </> 
          )
}