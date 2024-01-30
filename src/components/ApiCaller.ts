import { Action, combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ApiContextProps } from './context/useApiContext'
import {
  ApiCallerResponseInterface,
  ApiInterface,
  RequestInterface,
  RequestOverrideOptionInterface,
} from './types'
import { formatRequest, isFunction, isNil, isObjectType, setParams } from './utils'
import { ApiSliceFactory } from './ApiSliceFactory'
import { BuildReducerFromMap } from './BuildReducerFromMap'

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

  const apiSlice = ApiSliceFactory<IKeys, S, E>({
    request,
    mainKey: reduxKey,
  })

  const { error, requested, success, clear } = apiSlice.actions
  const upperScopeRequest = request

  function thunkAction(
    request: RequestOverrideOptionInterface | undefined,
    context: ApiContextProps<IKeys>,
  ): ThunkAction<Promise<any>, any, unknown, Action<string>> {
    const { factory, serialzeError, serialzeResponse, store, apisReducers, reducers, setApiReducers } = context

    const hashKey = request?.hashKey

    if (!apisReducers[reduxKey]) {
      if (hashKey) {
        apisReducers[reduxKey] = {
          [hashKey.join(',')]: apiSlice.reducer,
        }
      } else {
        apisReducers[reduxKey] = apiSlice.reducer
      }

      store.replaceReducer(
        combineReducers({
          apis: BuildReducerFromMap(apisReducers),
          ...reducers,
        }),
      )
      setApiReducers({...apisReducers});
    } else if (hashKey && hashKey?.length > 0) {
      if (!isObjectType(apisReducers[reduxKey])) {
        apisReducers[reduxKey] = {
          [hashKey.join(',')]: apiSlice.reducer,
        }
      } else {
        const previousReducers = {...apisReducers[reduxKey]}
        apisReducers[reduxKey] = {
          [hashKey.join(',')]: apiSlice.reducer,
          ...previousReducers,
        }
      }
      store.replaceReducer(
        combineReducers({
          apis: BuildReducerFromMap(apisReducers),
          ...reducers,
        }),
      )
      setApiReducers({...apisReducers});
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
