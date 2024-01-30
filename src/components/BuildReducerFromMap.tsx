import { isObjectType } from './utils'
import { Reducer, combineReducers } from '@reduxjs/toolkit'

export function BuildReducerFromMap(value: any): any {
  if (isObjectType(value)) {
    const newReducer: Record<string, Reducer<any>> = {}
    const keys = Object.keys(value)
    for (let key of keys) {
      newReducer[key] = isObjectType(value[key]) ? BuildReducerFromMap(value[key]) : value[key]
    }
    return combineReducers(newReducer)
  }
  return value
}
