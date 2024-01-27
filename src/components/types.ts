import { Reducer } from '@reduxjs/toolkit'
import { AxiosRequestConfig, Method } from 'axios'
import { ApiContextProps } from '.'

export type CallingLevel = 'component' | 'singleton'

type RequestOptions = {
  GET: object
  POST: {
    requestData: any | null
  }
  PUT: {
    requestData: any | null
  }
  DELETE: object
  PATCH: {
    requestData?: any | null
  }
}

export type RequestOverrideOptionInterface = {
  url?: string
  queryParams?: { [key: string]: any }
  params?: string[]
  headers?: { [key: string]: string }
  hashKey?: (string | number)[]
} & {
  [RequestType in keyof RequestOptions]: {
    type?: RequestType
  } & RequestOptions[RequestType]
}[keyof RequestOptions]


export type RequestInterface<IKeys extends string> = {
  url: string
  type?: Method
  queryParams?: { [key: string]: any }
  params?: string[]
  headers?: { [key: string]: string }
  otherAxiosConfiguration?: AxiosRequestConfig
  // override upper request payload with axios payload
  keys: IKeys
  /**
   * Can be called per component or app base
   */
  callingLevel?: CallingLevel
} & {
  [RequestType in keyof RequestOptions]: {
    type?: RequestType
  } & RequestOptions[RequestType]
}[keyof RequestOptions]

export type ApiInterface<IKeys extends string, S, E = any> = RequestInterface<IKeys> & {
  data: S | null
  error: E | null
  isLoading: boolean
  status: 'pending' | 'inprogress' | 'done' | 'not-called'
}

// // get Keys type
// type IKeysFrom<ApiInterface> = ApiInterface extends {keys: infer IKeys} ? (IKeys extends string ? IKeys: any ): any;

export interface ApiCallerResponseInterface<S> {
  reducer: Reducer<S>
  thunkAction: (
    request: RequestOverrideOptionInterface | undefined,
    context: ApiContextProps<any>,
  ) => any
  clear: any
  reduxKey: string
}
