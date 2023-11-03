// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// import { useAppSelector } from './redux';
// import {
// 	ApiCallerResponseInterface,
// 	ApiInterface,
// 	RequestOverrideOptionInterface,
// } from './types';

// type UseApiCallResponse<S, E> = {
// 	call: (overrideRequest?: RequestOverrideOptionInterface) => Promise<{
// 		payload: S
// 		type: any
// 	}>
// 	clear: () => void
// } & ApiInterface<S, E>

// export default function useApi<S, E = any>(
// 	thunkRequest: ApiCallerResponseInterface<ApiInterface<S, E>>,
// 	onError?: (err: any) => void,
// 	onSuccess?: (responseData: S) => void,
// ): UseApiCallResponse<S,E> {
// 	const appDispatch = useDispatch()
// 	const responseData: ApiInterface<S, E> = useAppSelector(
// 		state => (state.apis as any)[thunkRequest.reduxKey],
// 	)

// 	useEffect(() => {
// 		if (!responseData) return
// 		const {responseData: res} = responseData
// 		if (!responseData.isLoading) {
// 			if (!res && responseData.error) {
// 				if (onError) onError(responseData?.error)
// 			} else if (res && !responseData.error) {
// 				if (onSuccess) onSuccess(res)
// 			}
// 		}
// 	}, [responseData])

// 	return {
// 		call: (overrideRequest?: RequestOverrideOptionInterface) => {
// 			return appDispatch(thunkRequest.thunkAction(overrideRequest));
// 		},
// 		clear: () => {
// 			return appDispatch(thunkRequest.clear())
// 		},
// 		...responseData,
// 	}
// }
