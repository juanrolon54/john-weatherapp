import LocationInfo from './components/LocationInfo'
import WeatherBox from './components/SearchLocation'
import WeatherInfo from './components/WeatherInfo'
import Earth from './components/Earth'
import Contact from './components/Contact'

function App() {
  // The target for this app were desktop devices, but mobile support was somehow implemented. Now, deal with it.
  return (
    <div className='relative min-h-screen overflow-hidden grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3'>
      <div className='row-start-2 lg:row-start-1'>
        <WeatherBox />
      </div>
      <div className='relative col-span-2'>
        <div className='absolute top-2 left-2'>
          <WeatherInfo />
        </div>
        <div className='absolute w-full h-full grid place-items-center text-white select-none'>
          <p className='z-50 border border-white px-3 py-3 relative grid place-items-center'>
            <span className='absolute'>&#x2022;</span>
          </p>
        </div>
        <Earth />
      </div>
      <div className='fixed bottom-2 right-2 flex flex-col gap-2'>
        <Contact />
        <LocationInfo />
      </div>
    </div>
  )
}

export default App
