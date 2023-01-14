import { useContext } from '../context/AppContext'
import useWeatherByLocation from '../hooks/useWeatherByLocation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default () => {
  const { location, name } = useContext()
  const weather: any = useWeatherByLocation(location)
  const [latitude, longitude] = location

  const [animateRef] = useAutoAnimate<HTMLDivElement>()

  // {"latitude":0,"longitude":0,"generationtime_ms":0.20897388458251953,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":0,"current_weather":{"temperature":27.6,"windspeed":12.1,"winddirection":163,"weathercode":3,"time":"2023-01-12T20:00"}}

  return (
    <div ref={animateRef} className='w-fit h-full col-span-2'>
      {weather?.isLoading && <div>...</div>}
      {Object.keys(weather).length > 1 && (
        <div className='border border-white p-2'>
          <p className='text-[4rem] text-bold tracking-widest px-2 text-black bg-white w-fit'>
            {weather.current_weather.temperature}°
          </p>
          <p className='text-center text-lg'>{name}</p>
        </div>
      )}
    </div>
  )
}
