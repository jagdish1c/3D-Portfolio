// Weather API service
const API_KEY = 'e62eb4e483a7105d77a9af2fb006d432'; // Replace with your actual API key
const DEFAULT_CITY = 'London';

export const getWeather = async (city = DEFAULT_CITY) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    console.log(data)
    const weatherId = data.weather[0].id;
    let condition = 'clear';
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
      condition = 'rainy';
    }
    // Drizzle and Rain
    else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
      condition = 'rainy';
    }
    // Snow
    else if (weatherId >= 600 && weatherId < 700) {
      condition = 'snowy';
    }
    // Atmosphere (fog, mist, etc.)
    else if (weatherId >= 700 && weatherId < 800) {
      condition = 'foggy';
    }
    // Clouds
    else if (weatherId >= 801 && weatherId < 900) {
      condition = 'cloudy';
    }
    
    // Calculate local time for the city using timezone offset
    const timezoneOffset = data.timezone; // seconds from UTC
    const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const cityTime = new Date(utcTime + (timezoneOffset * 1000));
    const hour = cityTime.getHours();
    
    let timeOfDay;
    if (hour >= 5 && hour < 10) {
      timeOfDay = 'morning';
    } else if (hour >= 10 && hour < 17) {
      timeOfDay = 'afternoon';
    } else if (hour >= 17 && hour < 21) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'night';
    }
    
    return {
      condition,
      temperature: Math.round(data.main.temp - 273.15), // Convert from Kelvin to Celsius
      city: data.name,
      timeOfDay
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      condition: 'clear',
      temperature: 20,
      city: DEFAULT_CITY,
      timeOfDay: 'afternoon'
    };
  }
};

// Get time of day based on city timezone (deprecated - now handled in getWeather)
export const getTimeOfDay = (timezoneOffset = 0) => {
  const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
  const cityTime = new Date(utcTime + (timezoneOffset * 1000));
  const hour = cityTime.getHours();
  
  if (hour >= 5 && hour < 10) {
    return 'morning';
  } else if (hour >= 10 && hour < 17) {
    return 'afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'evening';
  } else {
    return 'night';
  }
};