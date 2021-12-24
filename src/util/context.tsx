import { createContext, useReducer } from 'react'
import type { ExportStatus } from 'src'
import reducers from './reducers'


interface ButtonData {
    exportStatus: ExportStatus
}

const buttonData = {
  exportStatus: 0,
}

const AppContext = createContext<{
  state: ButtonData
  dispatch: React.Dispatch<any>
}>({
  state: buttonData,
  dispatch: () => null
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, buttonData)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
