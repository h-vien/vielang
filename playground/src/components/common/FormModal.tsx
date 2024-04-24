import { Button, Form, Modal } from 'antd'
import { FormInstance, Rule } from 'antd/es/form'
import { Ref, forwardRef, useImperativeHandle, useState } from 'react'

export interface IFormItem {
  label: string
  name: string
  type: 'text' | 'textArea'
  rules?: Rule[]
}

interface IProps {
  title: string
  okText?: string
  cancelText?: string
  handleSubmit?: () => void
  handleCancel?: () => void
  children?: React.ReactNode | React.ReactNode[]
  form?: FormInstance
}

export interface IFormModalRef {
  showModal: () => void
  closeModal: () => void
}

function FormModal(props: IProps, ref: Ref<IFormModalRef>) {
  const { title, okText, cancelText = 'Cancel', children, form, handleSubmit, handleCancel } = props
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setConfirmLoading(false)
  }

  const handleOk = () => {
    handleSubmit && handleSubmit()
    setConfirmLoading(true)
  }

  const handleCancelBtn = () => {
    handleCancel && handleCancel()
    setOpen(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: showModal,
        closeModal: closeModal
      }
    },
    []
  )

  return (
    <Modal
      style={{ minWidth: 900 }}
      title={title}
      open={open}
      onCancel={() => {
        setOpen(false)
        handleCancel && handleCancel()
      }}
      confirmLoading={confirmLoading}
      footer={[
        <Button form='form' key='reset' htmlType='reset' onClick={handleCancelBtn}>
          {cancelText}
        </Button>,
        <Button form='form' key='submit' htmlType='submit' type='primary' loading={confirmLoading}>
          {okText}
        </Button>
      ]}
    >
      <Form
        form={form}
        name='form'
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        layout='vertical'
        autoComplete='off'
        onFinish={handleOk}
      >
        {children}
      </Form>
    </Modal>
  )
}

export default forwardRef(FormModal)
