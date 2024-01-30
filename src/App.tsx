import './App.css'

import { useEffect } from 'react'
import { testApi } from './api'
import { useApi } from './components'
import { useAppDispatch, useAppSelector } from './store'
import { increase } from './test.slice'


function Test() {
  const { data } = useApi(testApi, {
    hashKey: [5],
  })
  return (
    <>
      <p style={{ color: 'red' }}>{JSON.stringify(data)}</p>
    </>
  )
}

function App() {
  // const [count, setCount] = useState(0)
  const dispatch = useAppDispatch()

  const { call, clear, isLoading, data } = useApi(testApi)

  useEffect(() => {
    call()
  }, [])

  const count = useAppSelector((state) => state.count.count)
  const rand =  () => String(parseInt(String(Math.random() * 10)))
  return (
    <>
      <h4>{count}</h4>
      <p>{JSON.stringify(data)}</p>
      <button onClick={() => dispatch(increase())}>+</button>
      <button
        onClick={() =>
          call({
            params: [rand()],
            type: 'GET',
            hashKey: [rand()]
          })
        }
      >
        click
      </button>
      {isLoading && <h4>IsLoading</h4>}
      <Test/>
    </>
  )
}

export default App
