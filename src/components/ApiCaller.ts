import { Action, combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ApiContextProps } from './context/useApiContext'
import {
  ApiCallerResponseInterface,
  ApiInterface,
  RequestInterface,
  RequestOverrideOptionInterface,
} from './types'
import { formatRequest, setParams } from './utils'

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error response type default is null
 */
export const ApiCaller = <IKeys extends string, S, E = any>(
  reduxKey: string,
  request: RequestInterface<IKeys>,
): ApiCallerResponseInterface<ApiInterface<IKeys, S, E>> => {
  formatRequest(request)
  const initialState: ApiInterface<IKeys, S, E> = {
    ...request,
    responseData: null,
    error: null,
    isLoading: false,
    status: 'pending',
  }

  if (request.type === 'POST' || request.type === 'PUT' || request.type === 'PATCH') {
    initialState.responseData = null
  }

  const apiSlice = createSlice({
    name: reduxKey,
    initialState,
    reducers: {
      requested(state, action: PayloadAction<RequestInterface<IKeys> | null>): void {
        if (action.payload) {
          Object.assign(state, action.payload)
        }
        state.isLoading = true
        state.responseData = null
        state.error = null
        state.status = 'inprogress'
      },
      success(state, action): void {
        state.isLoading = false
        state.responseData = action.payload
        state.error = null
        state.status = 'done'
      },
      error(state, action): void {
        state.isLoading = false
        state.responseData = null
        state.error = action.payload
        state.status = 'done'
      },
      clear(state): void {
        state.isLoading = false
        state.responseData = null
        state.error = null
        state.status = 'pending'
      },
    },
  })

  const { error, requested, success, clear } = apiSlice.actions
  const upperScopeRequest = request

  function thunkAction(
    request: RequestOverrideOptionInterface | undefined,
    context: ApiContextProps<IKeys>,
  ): ThunkAction<Promise<any>, any, unknown, Action<string>> {
    const { factory, serialzeError, serialzeResponse, store, apisReducers, reducers } = context

    if (!apisReducers[reduxKey]) {
      apisReducers[reduxKey] = apiSlice.reducer
      store.replaceReducer(
        combineReducers({
          apis: combineReducers({
            ...apisReducers,
          }),
          ...reducers,
        }),
      )
    }

    return async (dispatch: ThunkDispatch<any, unknown, Action<string>>): Promise<any> => {
      const currentRequest = Object.assign({}, upperScopeRequest, request)
      formatRequest(currentRequest)
      dispatch(requested(currentRequest))
      setParams(currentRequest)
      if (currentRequest.type) {
        return factory(currentRequest.keys, currentRequest) // get key from context
          .then((res) => {
            return dispatch(success(serialzeResponse(res)))
          })
          .catch((err) => {
            dispatch(error(serialzeError(err)))
            throw err
          })
      }
      return Promise.reject('Invalid Request')
    }
  }

  return {
    reducer: apiSlice.reducer,
    thunkAction,
    clear,
    reduxKey,
  }
}
