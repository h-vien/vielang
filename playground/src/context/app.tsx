import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Profile } from 'src/interface/app'
import { getProfileFromLS } from 'src/utils/auth'

export interface AppContextProps {
  profile: Profile | null
  setProfile: Dispatch<SetStateAction<Profile | null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  isAuthenticated: boolean
}

export const getInitialAppContext: () => AppContextProps = () => ({
  isAuthenticated: Boolean(getProfileFromLS()),
  profile: getProfileFromLS(),
  setIsAuthenticated: () => null,
  setProfile: () => null
})

const initialProps = getInitialAppContext()

export const AppContext = createContext<AppContextProps>(initialProps)

export function AppProvider({
  children,
  defaultValue = initialProps
}: {
  children: React.ReactNode
  defaultValue?: AppContextProps
}) {
  const [profile, setProfile] = useState<Profile | null>(defaultValue.profile)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        profile,
        isAuthenticated,
        setIsAuthenticated,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
