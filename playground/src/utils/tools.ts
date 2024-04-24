import { get } from 'lodash'
import { Nameable, SelectOption } from 'src/types/utils.type'

export const scrollToTop = () => {
  window?.scrollTo({
    behavior: 'smooth',
    top: 0
  })
}

export const convertDataToSelectOptions = <T extends Nameable>(data: T[], valueProp: string): SelectOption[] =>
  data?.map((item) => {
    return {
      label: `${item.name || item.full_name}`,
      value: get(item, valueProp)
    }
  }) || []
