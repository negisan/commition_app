import React, { useContext } from 'react'
import { toast } from 'react-toastify'

const UIContext = React.createContext<any | null>({})

export const UIProvider = ({ children }: any) => {
  const toastSuccess = (message: string) => {
    toast.success(`${message}`)
  }

  const toastError = (message: string) => {
    toast.error(`${message}`)
  }

  return (
    <UIContext.Provider
      value={{
        toastSuccess,
        toastError,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = () => {
  return useContext(UIContext)
}
