import axios from 'axios'

export const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})

export const locationApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/search',
  headers: {
    'Content-type': 'application/json'
  }
})

export const getWeatherByLocation = (location: [number, number]) => {
  const [latitude, longitude] = location
  const forecast = weatherApi.get('', {
    params: {
      latitude,
      longitude,
      current_weather: true
    },
    withCredentials: true
  })
  return forecast
}

export type locationSearchItem = {
  country: string
  country_code: string
  country_id: number
  elevation: number
  feature_code: string
  id: number
  latitude: number
  longitude: number
  name: string
  population: number
}

export const searchAutocomplete = async (name: string = '') => {
  const response = await locationApi.get('', {
    params: { name, count: 50 }
  })
  return response
}
