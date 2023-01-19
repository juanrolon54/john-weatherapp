import { useContext } from '../context/AppContext'
import useWeatherByLocation from '../hooks/useWeatherByLocation'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useSearchParamsState from '../hooks/useSearchParamsState'
import { useEffect, useState } from 'react'

// Maximum update depth exceeded. 
// This can happen when a component calls setState inside useEffect, 
// but useEffect either doesn't have a dependency array, 
// or one of the dependencies changes on every render.

export default () => {
  const { name } = useContext()
  const [latitude] = useSearchParamsState('latitude')
  const [longitude] = useSearchParamsState('longitude')

  const weather: any = useWeatherByLocation([Number(latitude), Number(longitude)])

  const [animateRef] = useAutoAnimate<HTMLDivElement>()

  // {"latitude":0,"longitude":0,"generationtime_ms":0.20897388458251953,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":0,"current_weather":{"temperature":27.6,"windspeed":12.1,"winddirection":163,"weathercode":3,"time":"2023-01-12T20:00"}}

  return (
    <div ref={animateRef} className='w-fit h-full col-span-2'>
      {weather?.isLoading && <div>...</div>}
      {Object.keys(weather).length > 1 && (
        <div className='border border-white p-2'>
          <p className='text-[4rem] text-bold tracking-widest px-2 text-black bg-white w-fit'>
            {weather?.current_weather?.temperature || '--'}°
          </p>
          <p className='text-center text-lg'>{name}</p>
        </div>
      )}
    </div>
  )
}
