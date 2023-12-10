import './App.css'

import { useEffect, useState } from 'react'

import viteLogo from '/vite.svg'

import reactLogo from './assets/react.svg'
import { useApi } from './components'
import { testApi } from './api'

import { ApiCaller } from "./components"
import React from 'react'

type BasicResponse<T> = {
  status: 'success' | 'error'
  data: T
  message: string
}

type Employee = {
  id: string
  employee_name: string
  employee_salary: number
  employee_age: 123
  profile_image: string
}


function App() {
  const [count, setCount] = useState(0)
  
  const testApi = React.useMemo(() => {
    return  ApiCaller<'api1', BasicResponse<Employee[]>>('test1', {
    type: 'GET',
    url: 'posts',
    keys: 'api1',
  })
}, []);

  const {call, clear, isLoading, responseData} = useApi(testApi)

  useEffect(() => {
    call()
  }, [])


  console.log(responseData, isLoading);
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
