import { Button, Form, Input, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

export default function Register() {
  const onFinish = (values: any) => {
    console.log(values)
  }
  return (
    <div className='flex items-center flex-col justify-center w-full h-screen'>
      <Typography.Title level={3} className='!mb-4'>
        Tạo tài khoản
      </Typography.Title>
      <Form onFinish={onFinish} name='login' layout='vertical' colon={false} style={{ minWidth: 400 }}>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên tài khoản'
            },
            {
              min: 8,
              message: 'Tên tài khoản phải có ít nhất 8 ký tự'
            },
            {
              max: 30,
              message: 'Tên tài khoản không được quá 30 ký tự'
            }
          ]}
        >
          <Input placeholder='Tên tài khoản' className='h-12  border border-solid rounded-xl' />
        </Form.Item>
        <Space />
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu'
            },
            {
              min: 6,
              max: 20,
              message: 'Mật khẩu phải có từ 6 đến 20 ký tự'
            }
          ]}
        >
          <Input.Password placeholder='Mật khẩu' className='h-12  border border-solid rounded-xl' />
        </Form.Item>
        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp'))
              }
            })
          ]}
        >
          <Input.Password placeholder='Xác nhận mật khẩu' className='h-12  border border-solid rounded-xl' />
        </Form.Item>
        <div className='flex justify-end my-4'>
          <p>
            Bạn đã có tài khoản?
            <Link className='text-emerald-400 ml-2 font-bold' to='/login'>
              Đăng nhập
            </Link>
          </p>
        </div>
        <Button
          //   loading={registerMutation.isLoading}
          type='primary'
          className='w-full font-bold rounded-xl'
          size='large'
          htmlType='submit'
        >
          Tạo tài khoản
        </Button>
      </Form>
    </div>
  )
}
