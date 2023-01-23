import { searchAutocomplete } from '../api/weather'
import { useQuery } from 'react-query'

export default (search: string) => {
  const response = useQuery(search + '-search', () => searchAutocomplete(search.trim()))
  return response
}
