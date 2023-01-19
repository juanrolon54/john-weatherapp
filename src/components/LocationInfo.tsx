import { ChangeEvent } from 'react'
import { useContext } from '../context/AppContext'
import useSearchParamsState from '../hooks/useSearchParamsState'

export default () => {
  const { location, setLocation, setName } = useContext()

  const [latitude, setLatitude] = useSearchParamsState('latitude')
  const [longitude, setLongitude] = useSearchParamsState('longitude')
  const handle = {
    latitude(e: ChangeEvent<HTMLInputElement>) {
      setLatitude(e.target.value)
      setName('custom')
    },
    longitude(e: ChangeEvent<HTMLInputElement>) {
      setLongitude(e.target.value)
      setName('custom')
    }
  }
  // -90 to 90 for latitude and -180 to 180 for longitude
  return (
    <div className='px-4 py-2 bg-white text-black'>
      <div className='flex text-xl flex-col items-end lg:flex-row lg:gap-4'>
        <div>
          LATITUDE{' '}
          <input
            min={-90}
            max={90}
            type='number'
            className='px-1 bg-black text-white outline-none w-32 transition-all'
            value={latitude || 0}
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
            value={longitude || 0}
            onChange={handle.longitude}
          />
        </div>
      </div>
    </div>
  )
}
