import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ModalFuncProps } from 'antd'
import { Modal, Space } from 'antd'

interface Props {
  onEdit?: () => void
  onDelete?: () => void
  deleteAction?: ModalFuncProps
}

function FormAction({ onEdit, onDelete, deleteAction }: Props) {
  const [modal, contextHolder] = Modal.useModal()

  const handleDelete = () => {
    modal.confirm({
      cancelText: deleteAction?.cancelText ?? 'Cancel',
      centered: true,
      content: deleteAction?.content ?? 'Are you sure you want to delete this item?',
      icon: deleteAction?.icon,
      okText: deleteAction?.okText ?? 'Delete',
      onOk: onDelete,
      title: deleteAction?.title ?? 'Delete Item'
    })
  }

  return (
    <Space className='flex items-center' size={14}>
      {onEdit && <EditOutlined name='edit' onClick={onEdit} />}
      {onDelete && <DeleteOutlined name='ic-delete' onClick={handleDelete} />}
      {contextHolder}
    </Space>
  )
}

export default FormAction
