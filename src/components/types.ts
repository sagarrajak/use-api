import { Reducer } from '@reduxjs/toolkit'

export interface RequestInterface {
  url: string
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  requestData?: any | null
  queryParams?: { [key: string]: any }
  params?: string[]
  headers?: { [key: string]: string }
  instanceType?: 'OS' | 'DS'
}

export interface ApiInterface<S, E = any> extends RequestInterface {
  responseData: S | null
  error: E | null
  isLoading: boolean
}

export type RequestOverrideOptionInterface = {
  url?: string
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  requestData?: any | null
  queryParams?: { [key: string]: any }
  params?: string[]
  headers?: { [key: string]: string }
}

export interface ApiCallerResponseInterface<S> {
  reducer: Reducer<S>
  thunkAction: (request?: RequestOverrideOptionInterface) => any
  clear: any
  reduxKey: string
}
