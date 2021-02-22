import { HTTPMethod } from '@/infra/network/types'
import { TupleToUnion } from '@/types/helpers'

export interface APIRequest<R> {
  response: R
  path: string
  method: TupleToUnion<typeof HTTPMethod>
  params?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  baseURL?: string
}
