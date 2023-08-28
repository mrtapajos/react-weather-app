import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "8517793b90d646029a9154631232708";
  const apiUrl = `http://api.weatherapi.com/v1`;

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null)

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`${apiUrl}/current.json?key=${apiKey}&q=${city}`)
      
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await fetchWeatherData(city)
    setWeatherData(data)

    console.log(data)
  } 


  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>

      <div className="city-form">
        <form>
          <input type="text" placeholder="Digite uma cidade..." onChange={(e) => setCity(e.target.value)}/>
          <button type="submit" onClick={handleSubmit}>CONFIRA</button>
        </form>
      </div>

      {weatherData && (
        <div className="weather-info">
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Feels like: {weatherData.current.feelslike_c}</p>
          <p>Humidity: {weatherData.current.humidity}</p>
        </div>
      )}

    </div>
  );
}

export default App;
