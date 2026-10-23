import { createContext, useEffect, useState } from "react"
import { changeLocalStorage, getAllLocalStorage } from "../services/storage"
import { login } from "../services/login"

interface IAppContext {
    user: string,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
    loading: boolean,
}

export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
      const storage = getAllLocalStorage()

      const restoreSession = async () => {
        if (!storage) {
          setIsLoggedIn(false)
          setLoading(false)
          return
        }

        const { login: storageLogin, email, password } = JSON.parse(storage)
        const loggedIn = Boolean(storageLogin && email && password && await login(email, password))

        setIsLoggedIn(loggedIn)
        if (!loggedIn) {
          changeLocalStorage({ login: false, email: '', password: '' })
        }
        setLoading(false)
      }

      void restoreSession()
    }, [])

    const user = 'nathally'
  
    return (
      <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, loading }}>
        { children }
      </AppContext.Provider>
    )
}
