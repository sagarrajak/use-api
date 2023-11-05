import { Reducer } from '@reduxjs/toolkit'

export type RequestInterface = {
  url: string
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  queryParams?: { [key: string]: any }
  params?: string[]
  headers?: { [key: string]: string }
  requestData?: any | null,
  requestSpecificConfigurationPayload?: any;
}

export interface ApiInterface<S, E = any> extends RequestInterface {
  responseData: S | null
  error: E | null
  isLoading: boolean,
  status: 'pending' | 'inprogress' | 'done'
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

export type CallingLevel = 'component' | 'singleton' ;
export type StoragePreference = 'localstorage' | 'redux' | 'session' | 'none';

export type Configuration = {
    callingLevel?: CallingLevel;
    storage?: StoragePreference;
    enabled?: boolean 
}