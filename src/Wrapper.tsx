import axios, { AxiosError, AxiosResponse } from 'axios'
import App from './App'
import { ApiProvider, RequestInterface } from './components'
import { reducers, store } from './store'

function Wrapper() {
  return (
    <ApiProvider<any, any, 'api1'>
      factory={function (
        enums: 'api1',
        request: RequestInterface<'api1'>,
      ): Promise<AxiosResponse<any, any>> {
        switch (enums) {
          case 'api1': {
            if (request.type === 'PATCH' || request.type === 'POST' || request.type === 'PUT') {
              return axios({
                baseURL: `https://jsonplaceholder.typicode.com/`,
                url: request.url,
                method: request.type,
                headers: request.headers,
                data: request.requestData,
                params: request.queryParams,
              })
            } else {
              return axios({
                baseURL: `https://jsonplaceholder.typicode.com/`,
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
                baseURL: `https://jsonplaceholder.typicode.com/`,
                method: request.type,
                headers: request.headers,
                data: request.requestData,
                url: request.url,
                params: request.queryParams,
              })
            } else {
              return axios({
                baseURL: `https://jsonplaceholder.typicode.com/`,
                method: request.type,
                headers: request.headers,
                url: request.url,
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
      store={store}
      reducers={reducers}
    >
      <App />
    </ApiProvider>
  )
}

export default Wrapper
