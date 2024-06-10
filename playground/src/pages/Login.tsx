import { Button, Form, Input, Space, Typography } from 'antd'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/context/app'
import { setProfileToLS } from 'src/utils/auth'

export default function Login() {
  const { setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    const { data } = await authApi.login({
      user_name: values.username,
      password: values.password
    })
    if (data) {
      setProfile(data as any)
      setProfileToLS(data as any)
      navigate('/')
    }
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

        <div className='flex justify-end my-4'>
          <p>
            Bạn chưa có tài khoản?
            <Link className='text-emerald-400 ml-2 font-bold' to='/register'>
              Đăng ký
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
          Đăng nhập
        </Button>
      </Form>
    </div>
  )
}
