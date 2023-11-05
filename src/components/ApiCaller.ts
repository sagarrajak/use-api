import { Action, createSlice,PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ApiCallerResponseInterface, ApiInterface, RequestInterface, RequestOverrideOptionInterface } from './types'

const formatRequest = (request: RequestInterface): void => {
	if (_.isNil(request.headers)) {
		request.headers = {}
	}
	if (_.isNil(request.params)) {
		request.params = []
	}
	if (_.isNil(request.queryParams)) {
		request.queryParams = {}
	}
	if (_.isUndefined(request.requestData)) {
		request.requestData = null
	}
}

const setParams = (request: RequestInterface): void => {
	if (_.isNil(request.params) || request.params.length <= 0) return
	request.url =
		request.url +
		'/' +
		request.params.map((str: string) => encodeURIComponent(str)).join('/')
}

export class ApiError extends Error {
	public error: any;
	constructor(message: string, err: any) {
		super(message)
		this.name = 'ApiError'
		this.error = err;
	}
}

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error response type default is null
 */
export const ApiCaller = <S, E = any>(
	reduxKey: string,
	request: RequestInterface,
): ApiCallerResponseInterface<ApiInterface<S, E>> => {
	formatRequest(request)
	const initialState: ApiInterface<S, E> = {
		...request,
		requestData: null,
		responseData: null,
		error: null,
		isLoading: false,
		status: 'pending'
	}

	const apiSlice = createSlice({
		name: reduxKey,
		initialState,
		reducers: {
			requested(state, action: PayloadAction<RequestInterface | null>): void {
				if (action.payload) {
					_.assign(state, action.payload)
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

	const {error, requested, success, clear} = apiSlice.actions
	const upperScopeRequest = request

	function thunkAction(
		request?: RequestOverrideOptionInterface,
	): ThunkAction<Promise<any>, any, unknown, Action<string>> {
		return async (
			dispatch: ThunkDispatch<any, unknown, Action<string>>,
		): Promise<any> => {
			if (_.isNil(request)) {
				request = {}
			}
			const currentRequest = _.assign({}, upperScopeRequest, request)
			formatRequest(currentRequest)
			dispatch(requested(currentRequest))
			setParams(currentRequest)
			if (currentRequest.type) {
				// return ServiceApi.getInstance(currentRequest.instanceType)
				// 	.Axios(currentRequest.url, {
				// 		method: currentRequest.type,
				// 		url: currentRequest.url,
				// 		data: currentRequest.type !== 'GET' ? currentRequest.requestData : {},
				// 		params: currentRequest.queryParams,
				// 		headers: currentRequest.headers,
				// 	})
				// 	.then(axiosResponse => {
				// 		if (axiosResponse.status !== 200) {
				// 			throw new ApiError(axiosResponse?.data?.message ? axiosResponse.data.message : 'Something went wrong!', axiosResponse.data)
				// 		} else if (!_.isNil(axiosResponse?.data.status) && !axiosResponse?.data.status) {
				// 			throw new ApiError(axiosResponse?.data?.message ? axiosResponse.data.message : 'Something went wrong!', axiosResponse.data)
				// 		}
				// 		else return dispatch(success(axiosResponse.data))
				// 	})
				// 	.catch(err => {
				// 		dispatch(error(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))))
				// 		throw err;
				// 	})
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
