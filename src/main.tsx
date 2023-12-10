import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { UseApiContextProvider } from './components/context/UseApiContextProvider.tsx'
import { RequestInterface } from './components/types.ts'
import Wrapper from './Wrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wrapper/>
  </React.StrictMode>,
)
