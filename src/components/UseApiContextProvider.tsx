import { ApiContext, ApiContextProps } from './useApiContext'

export type UseApiContextProviderProps<S extends string> = ApiContextProps<S> & {
  children: JSX.Element
}

function UseApiContextProvider<S extends string>(props: UseApiContextProviderProps<S>) {
  const { children } = props
  return <ApiContext.Provider value={props}>{children}</ApiContext.Provider>
}

export default UseApiContextProvider
