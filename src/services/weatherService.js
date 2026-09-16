import axios from "axios";

const API_KEY = "21224c352ca329774b80536b03b6b23d";

export const getWeather = async (city) => {
  try {
    console.log("CITY:", city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await axios.get(url);

    console.log("API RESPONSE:", res.data);

    return {
      temp: res.data.main.temp,
      condition: res.data.weather[0].main,
      city: res.data.name,
    };
  } catch (error) {
    console.log("WEATHER ERROR:", error.response?.data || error.message);
    return null;
  }
};