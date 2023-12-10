import React from 'react'
import App from './App'
import { RequestInterface, UseApiContextProvider } from './components'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { Provider } from 'react-redux'
import { store } from './store'

function Wrapper() {
  return (
    <Provider store={store}>
      <UseApiContextProvider<'api1'>
        factory={function (
          enums: 'api1',
          request: RequestInterface<'api1'>,
        ): Promise<AxiosResponse<any, any>> {
          switch (enums) {
            case 'api1': {
              if (request.type === 'PATCH' || request.type === 'POST' || request.type === 'PUT') {
                return axios({
                  baseURL: `https://jsonplaceholder.typicode.com${
                    request.params && request.params?.length > 0 ? request.params?.join('/') : ''
                  }`,
                  url: request.url,
                  method: request.type,
                  headers: request.headers,
                  data: request.requestData,
                  params: request.queryParams,
                })
              } else {
                return axios({
                  baseURL: `https://jsonplaceholder.typicode.com${
                    request.params && request.params?.length > 0 ? request.params?.join('/') : ''
                  }`,
                  method: request.type,
                  url: request.url,
                  headers: request.headers,
                  params: request.queryParams,
                })
              }
            }
            default: {
              if (request.type === 'PATCH' || request.type === 'POST' || request.type === 'PUT') {
                return axios({
                  baseURL: `https://jsonplaceholder.typicode.com${
                    request.params && request.params?.length > 0 ? request.params?.join('/') : ''
                  }`,
                  method: request.type,
                  headers: request.headers,
                  data: request.requestData,
                  url: request.url,
                  params: request.queryParams,
                })
              } else {
                return axios({
                  baseURL: `https://jsonplaceholder.typicode.com${
                    request.params && request.params?.length > 0 ? request.params?.join('/') : ''
                  }`,
                  method: request.type,
                  headers: request.headers,
                  params: request.queryParams,
                })
              }
            }
          }
        }}
        serialzeError={function (data: AxiosError<unknown, any>): Promise<any> {
          return Promise.resolve({ message: data.message || 'Something went wrong' })
        }}
        serialzeResponse={function <ApiResponse>(data: AxiosResponse<any, any>): ApiResponse {
          return data.data
        }}
      >
        <App />
      </UseApiContextProvider>
    </Provider>
  )
}

export default Wrapper
