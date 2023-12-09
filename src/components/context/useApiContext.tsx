import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import React from 'react'

export type ApiContextProps<T extends string = any> = {
  factory: (enums: T, request: AxiosRequestConfig) => Promise<AxiosResponse>
  serialzeError: (data: AxiosError) => Promise<any>
  serialzeResponse: <ApiResponse>(data: AxiosResponse) => ApiResponse
}

export const ApiContext = React.createContext<ApiContextProps | null>(null)

export const useApiContext = (): ApiContextProps => {
  const context = React.useContext(ApiContext)
  if (!context) {
    throw new Error('Context for use-api not provided!')
  }
  return context
}
