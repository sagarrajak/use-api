import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ApiInterface, RequestInterface } from '.'

export function ApiSliceFactory<IKeys extends string, S, E>(params: {
  mainKey: string
  request: RequestInterface<IKeys>
}) {
  const { mainKey, request } = params

  const initialState: ApiInterface<IKeys, S, E> = {
    ...request,
    data: null,
    error: null,
    isLoading: false,
    status: 'pending',
  }

  if (request.type === 'POST' || request.type === 'PUT' || request.type === 'PATCH') {
    initialState.data = null
  }

  return createSlice({
    name: mainKey,
    initialState,
    reducers: {
      requested(state, action: PayloadAction<RequestInterface<IKeys> | null>): void {
        if (action.payload) {
          Object.assign(state, action.payload)
        }
        state.isLoading = true
        state.data = null
        state.error = null
        state.status = 'inprogress'
      },
      success(state, action): void {
        state.isLoading = false
        state.data = action.payload
        state.error = null
        state.status = 'done'
      },
      error(state, action): void {
        state.isLoading = false
        state.data = null
        state.error = action.payload
        state.status = 'done'
      },
      clear(state): void {
        state.isLoading = false
        state.data = null
        state.error = null
        state.status = 'pending'
      },
    },
  })
}
