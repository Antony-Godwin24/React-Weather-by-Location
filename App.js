import {useState,useEffect} from 'react';
function App() {

  const [lat,setLat]=useState(null);
  const [long,setLong]=useState(null);
  const [weather,setWeather]=useState(null);

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition((position)=>{
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }, (error)=>{
    console.log("Error While Getting Location",error);
  });
},[]);

useEffect(() => {
  if (lat && long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4239c50d88036196e718f152df222cc4
&units=metric`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        console.log(data);
      })
      .catch(err => console.log("Error fetching weather:", err));
  }
}, [lat, long]);



  return (
    <div className="App">
      <div class="header">
        <h1>Weather App</h1>
        <div id="lat-long">
          <h2>Latitiude: {lat}</h2>
          <h2>Longitude: {long}</h2>
        </div>
      </div>

      {weather && (
      <div class="main">
        
        <p>Location: {weather.name}</p>
        <p>Temperature: {weather.main?.temp} *C</p>
        <p>Condition: {weather.weather?.[0]?.description}</p>
      </div>

      )}
    </div>
  );
}

export default App;
