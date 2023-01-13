import {
  ReactNode,
  createContext,
  useContext as useReactContext,
  useState
} from 'react'
import type { locationSearchItem } from '../api/weather'

export type value = {
  location: [number, number]
  setLocation: (location: [number, number]) => void
}

const appContext = createContext<value | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<[number, number]>([0, 0])

  return (
    <appContext.Provider value={{ location, setLocation }}>
      {children}
    </appContext.Provider>
  )
}

export const useContext = () => {
  const value = useReactContext(appContext)
  return value as value
}
