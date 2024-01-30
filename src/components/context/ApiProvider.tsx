import { Provider, ProviderProps } from 'react-redux'
import { ApiContext, ApiContextProps, ReducerMap } from './useApiContext'
import { Action, AnyAction, Reducer } from '@reduxjs/toolkit'
import { useState } from 'react'

export type ApiProviderProps<S extends string> = Omit<
  ApiContextProps<S>,
  'apisReducers' | 'setApiReducers'
> & {
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
  const [apisReducers, setApiReducer] = useState<ReducerMap>({})
  console.log({apisReducers});
  return (
    <Provider {...props}>
      <ApiContext.Provider
        value={{
          ...props,
          apisReducers,
          setApiReducers: (value: ReducerMap) => setApiReducer(value),
        }}
      >
        {children}
      </ApiContext.Provider>
    </Provider>
  )
}
