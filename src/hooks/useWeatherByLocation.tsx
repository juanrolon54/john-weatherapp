import { useEffect, useState } from 'react'
import { getWeatherByLocation } from '../api/weather'

export default (location: [number, number]) => {
  const [weather, setWeather] = useState<unknown>({})

  useEffect(() => {
    setWeather({ isLoading: true })
    getWeatherByLocation(location)
      .then((response: any) => {
        setWeather(response.data)
      })
      .catch(() => {
        setWeather({})
      })
  }, [location[0], location[1], setWeather])

  return weather
}
