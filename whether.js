// Replace 'your_api_key_here' with your actual OpenWeatherMap API key
const apiKey = '7c46b9f78093d244486a85c7db459b79';

document.getElementById('getWeather').addEventListener('click', function() {
  const city = document.getElementById('city').value;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      document.getElementById('weatherData').innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    document.getElementById('weatherData').innerHTML = `<p>Something went wrong!</p>`;
  }
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const weatherData = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${weatherIconUrl}" alt="Weather icon">
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherData').innerHTML = weatherData;
}
