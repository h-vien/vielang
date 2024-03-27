import { Keyword } from '~/constants/keyword'
import { Operator } from './operator'

export type Token = {
  type: Keyword | Operator | null
  value: string | number
  start: number
  end: number
}
