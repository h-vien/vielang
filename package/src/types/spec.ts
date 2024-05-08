import { Keyword } from '@parser/constants/keyword'
import { Operator } from './operator'

export type Spec = [RegExp, Keyword | Operator | null]
