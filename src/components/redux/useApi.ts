import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ApiCallerResponseInterface, ApiInterface, RequestOverrideOptionInterface } from '../types'
import { useApiContext } from '..'

type UseApiCallResponse<Keys extends string, S, E> = {
  call: (overrideRequest?: RequestOverrideOptionInterface) => Promise<{
    payload: S
    type: any
  }>
  clear: () => void
} & ApiInterface<Keys, S, E>

export function useApi<Keys extends string, S, E = any>(
  thunkRequest: ApiCallerResponseInterface<ApiInterface<Keys, S, E>>,
  onError?: (err: any) => void,
  onSuccess?: (responseData: S) => void,
): UseApiCallResponse<Keys, S, E> {
  const appDispatch = useDispatch()
  const context = useApiContext()

  const responseData: ApiInterface<Keys, S, E> = useSelector(
    (state: any) => (state.apis as any)[thunkRequest.reduxKey],
  )

  useEffect(() => {
    if (!responseData) return
    const { responseData: res } = responseData
    if (!responseData.isLoading) {
      if (!res && responseData.error) {
        if (onError) onError(responseData?.error)
      } else if (res && !responseData.error) {
        if (onSuccess) onSuccess(res)
      }
    }
  }, [responseData])

  return {
    call: (overrideRequest?: RequestOverrideOptionInterface) => {
      return appDispatch(thunkRequest.thunkAction(overrideRequest, context))
    },
    clear: () => {
      return appDispatch(thunkRequest.clear())
    },
    ...responseData,
  }
}
