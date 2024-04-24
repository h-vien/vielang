import { Select, SelectProps } from 'antd'
import { convertDataToSelectOptions } from 'src/utils/tools'
import styles from './styles.module.scss'
import { Nameable } from 'src/types/utils.type'

interface CustomSelectorProps<T> extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
  data: T[]
  isLoading: boolean
  placeholder: string
}

const CustomSelector = <T extends Nameable>({
  data,
  isLoading,
  placeholder,
  size = 'large',
  ...props
}: CustomSelectorProps<T>) => {
  const options = convertDataToSelectOptions<T>(data, 'id')

  return (
    <Select
      placeholder={placeholder}
      loading={isLoading}
      options={options}
      optionFilterProp='label'
      showSearch
      size={size}
      {...props}
      className={styles.customSelector}
    />
  )
}

export default CustomSelector
