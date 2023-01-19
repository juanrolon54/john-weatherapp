import {
  ReactNode,
  createContext,
  useContext as useReactContext,
  useState
} from 'react'
import type { locationSearchItem } from '../api/weather'

export type value = {
  name: string
  setName: (name: string) => void
}

const appContext = createContext<value | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('')

  return (
    <appContext.Provider value={{ name, setName }}>
      {children}
    </appContext.Provider>
  )
}

export const useContext = () => {
  const value = useReactContext(appContext)
  return value as value
}
