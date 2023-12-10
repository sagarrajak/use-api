import React from 'react'
import { ApiContext, ApiContextProps } from './useApiContext'

export type UseApiContextProviderProps<S extends string> = Omit<
  ApiContextProps<S>,
  'isKeyAlreadyInserted'
> & {
  children: JSX.Element
}

export function UseApiContextProvider<S extends string>(props: UseApiContextProviderProps<S>) {
  const { children } = props
  const isKeyAlreadyInserted = React.useRef<Map<string, boolean>>(new Map())

  return (
    <ApiContext.Provider 
      value={{ ...props, isKeyAlreadyInserted: isKeyAlreadyInserted.current }}
    >
      {children}
    </ApiContext.Provider>
  )
}
