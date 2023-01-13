import { ChangeEvent } from 'react'
import { useContext } from '../context/AppContext'

export default () => {
  const { location, setLocation } = useContext()
  const [latitude, longitude] = location
  const handle = {
    latitude(e: ChangeEvent<HTMLInputElement>) {
      setLocation([Number(e.target.value), location[1]])
    },
    longitude(e: ChangeEvent<HTMLInputElement>) {
      setLocation([location[0], Number(e.target.value)])
    }
  }
  // -90 to 90 for latitude and -180 to 180 for longitude
  return (
    <div className='px-4 py-2 bg-white text-black'>
      <p className='flex text-xl flex-col items-end lg:flex-row lg:gap-4'>
        <div>
          LATITUDE{' '}
          <input
            min={-90}
            max={90}
            type='number'
            className='px-1 bg-black text-white outline-none w-32 transition-all'
            value={latitude}
            onChange={handle.latitude}
          />
        </div>

        <div>
          LONGITUDE{' '}
          <input
            min={-180}
            max={180}
            type='number'
            className='px-1 bg-black text-white outline-none w-32 transition-all'
            value={longitude}
            onChange={handle.longitude}
          />
        </div>
      </p>
    </div>
  )
}
