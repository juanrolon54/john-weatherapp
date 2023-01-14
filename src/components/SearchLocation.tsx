import { ChangeEvent, useEffect, FormEvent, useState, useRef } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import useSearchLocation from '../hooks/useSearchLocation'
import type { locationSearchItem } from '../api/weather'
import { useContext } from '../context/AppContext'

// country: "United States"
// country_code: "US"
// country_id: 6252001
// elevation: 543
// feature_code: "PCLI"
// id: 6252001
// latitude: 39.76
// longitude: -98.5
// name: "United States"
// population: 327167434

export default function WeatherBox() {
  const [results, setSearch, search] = useSearchLocation()
  const [animateRef] = useAutoAnimate<HTMLDivElement>()
  const { setLocation, setName } = useContext()
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    let searchResults: {
      data: {
        results: locationSearchItem[]
      }
    } = results as {
      data: {
        results: locationSearchItem[]
      }
    }
    if (
      searchResults?.data?.results &&
      searchResults?.data.results.length > 0
    ) {
      const { latitude, longitude } = searchResults?.data.results[0]
      setLocation([latitude, longitude])
      //TODO get better at typescript
      const { data }: any = results
      setName(data.results.name)
    }
  }
  return (
    <div className='p-2 flex flex-col h-screen'>
      <form
        onSubmit={submitHandler}
        className='flex bg-white p-2 text-black h-fit'
      >
        <input
          type='text'
          value={search}
          onChange={changeHandler}
          placeholder='Search by country or city'
          className='flex-1 border-b border-b-black bg-white outline-none placeholder:text-slate-600'
        />
        <button className='px-1'>Pick</button>
      </form>
      <div className='flex-1 h-full overflow-x-hidden overflow-y-scroll p-2'>
        <div className='flex flex-col gap-2' ref={animateRef}>
          {search !== '' && <QueryItems results={results} />}
        </div>
      </div>
    </div>
  )
}

const QueryItems = ({ results }: any) => {
  if (results.isLoading) return <div>...</div>
  if (results.isError) return <div>ERROR</div>
  if (!results.data?.results) return <div>No results</div>

  return (
    <>
      {results.data.results.map((item: locationSearchItem) => (
        <QueryItem key={item.id} item={item} />
      ))}
    </>
  )
}

const QueryItem = ({ item }: { item: locationSearchItem }) => {
  const { setLocation, setName } = useContext()
  const handleClick = () => {
    const { latitude, longitude } = item
    setLocation([latitude, longitude])
    setName(item.name)
  }
  return (
    <div
      onClick={handleClick}
      className='text-white border border-white w-full p-4 rounded-md h-fit hover:bg-white hover:text-black'
    >
      <p className='text-lg font-bold tracking-widest leading-4'>{item.name}</p>
      <small>
        <span className='px-2 bg-white text-black font-semibold border border-black'>
          {item.country_code}
        </span>{' '}
        - {item.country}
      </small>
      <p className='text-center mt-2'>
        {item.latitude}, {item.longitude}
      </p>
    </div>
  )
}
