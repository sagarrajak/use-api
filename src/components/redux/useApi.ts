import { useEffect, useRef } from 'react'
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
  onSuccess?: (data: S) => void,
): UseApiCallResponse<Keys, S, E> {

  const hashKey = useRef<(string | number)[]>();

  const appDispatch = useDispatch()
  const context = useApiContext()

  const data: ApiInterface<Keys, S, E> = hashKey.current ? useSelector(
    (state: any) => (state.apis as any)[thunkRequest.reduxKey][((hashKey.current || []))?.join(",")],
  ) : useSelector(
    (state: any) => (state.apis as any)[thunkRequest.reduxKey],
  )

  useEffect(() => {
    if (!data) return
    const { data: res } = data
    if (!data.isLoading) {
      if (!res && data.error) {
        if (onError) onError(data?.error)
      } else if (res && !data.error) {
        if (onSuccess) onSuccess(res)
      }
    }
  }, [data])

  return {
    call: (overrideRequest?: RequestOverrideOptionInterface) => {
      hashKey.current = overrideRequest?.hashKey;
      return appDispatch(thunkRequest.thunkAction(overrideRequest, context))
    },
    clear: () => {
      return appDispatch(thunkRequest.clear())
    },
    ...data,
  }
}
