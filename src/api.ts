import { ApiCaller } from "./components"

type BasicResponse<T> = {
  status: 'success' | 'error'
  data: T
  message: string
}

type Employee = {
  id: string
  employee_name: string
  employee_salary: number
  employee_age: 123
  profile_image: string
}

export const testApi = ApiCaller<'api1', BasicResponse<Employee[]>>('test1', {
  type: 'GET',
  url: 'employees',
  keys: 'api1',
})
