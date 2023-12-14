import { Provider, ProviderProps } from 'react-redux'
import { ApiContext, ApiContextProps } from './useApiContext'
import { Action, AnyAction } from '@reduxjs/toolkit'

export type ApiProviderProps<S extends string> = Omit<ApiContextProps<S>, 'apisReducers'> & {
  children: JSX.Element
}

export type ApiProviderPropsWithRedux<
  A extends Action = AnyAction,
  S = unknown,
  E extends string = any,
> = ApiProviderProps<E> & Omit<ProviderProps<A, S>, 'children'>

export function ApiProvider<A extends Action = AnyAction, S = unknown, E extends string = any>(
  props: ApiProviderPropsWithRedux<A, S, E>,
) {
  const { children } = props

  return (
    <Provider {...props}>
      <ApiContext.Provider value={{ ...props, apisReducers: {} }}>{children}</ApiContext.Provider>
    </Provider>
  )
}
