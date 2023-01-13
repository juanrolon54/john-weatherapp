import { useState, useEffect, useRef } from 'react'
import { searchAutocomplete } from '../api/weather'

export default (initialSearch?: string) => {
  const [search, setSearch] = useState(initialSearch || '')
  const timestamp = useRef(new Date().getTime())
  const [results, setResults] = useState({
    data: null,
    isError: false,
    isLoading: true
  })

  useEffect(() => {
    const cleanSearch = search.trim()
    if (cleanSearch !== '')
      searchAutocomplete(cleanSearch)
        .then(({ data }) => {
          const now = new Date().getTime()
          if (now > timestamp.current) {
            setResults({ data, isError: false, isLoading: false })
            timestamp.current = now
          }
        })
        .catch(() => null)
  }, [search, setResults])

  return [results, setSearch, search] as [
    unknown,
    (search: string) => void,
    string
  ]
}
