import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { RequestInterface } from '..'
import { Reducer } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

export type SetKeyAndReducerFunc = (key: string, reducerFunc: Reducer<any>) => void

export interface ReducerMap {
  [key: string]: Reducer<any> | ReducerMap
}

export type ApiContextProps<IKeys extends string = any> = {
  factory: (enums: IKeys, request: RequestInterface<IKeys>) => Promise<AxiosResponse>
  serialzeError: (data: AxiosError) => Promise<any>
  serialzeResponse: <ApiResponse>(data: AxiosResponse) => ApiResponse
  store: ToolkitStore
  apisReducers: ReducerMap
  reducers: { [key: string]: Reducer<any> }
  setApiReducers: (value: ReducerMap) => void
}

export const ApiContext = React.createContext<ApiContextProps | null>(null)

export const useApiContext = (): ApiContextProps => {
  const context = React.useContext(ApiContext)
  if (!context) {
    throw new Error('Context for use-api not provided!')
  }
  return context
}
