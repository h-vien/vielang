import { Keyword } from '../constants/keyword'
import { Operator } from './operator'

export type Spec = [RegExp, Keyword | Operator | null]
