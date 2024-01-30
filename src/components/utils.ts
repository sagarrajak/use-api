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

export function isObjectType(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}


export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    const newArray = []
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = deepClone(obj[i])
    }
    return newArray
  }

  const newObj: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }
  return newObj
}