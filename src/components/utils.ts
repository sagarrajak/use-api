export const isNil = (data: any): boolean => {
  return data === undefined || data === null
}

export const isUndefined = (data: any) => {
  return data === undefined
}

export const isFunction = (value: any) => typeof value === 'function';

export const formatRequest = (request: any) => {
  if (isNil(request.headers)) {
    request.headers = {}
  }
  if (isNil(request.params)) {
    request.params = []
  }
  if (isNil(request.queryParams)) {
    request.queryParams = {}
  }
  if (isUndefined(request.requestData)) {
    request.requestData = null
  }
}

export const setParams = (request: any): void => {
  const { params, url } = request
  if (params === null || params === undefined) return
  if ((params || []).length <= 0) return
  request.url = url + '/' + params.join('/')
}
