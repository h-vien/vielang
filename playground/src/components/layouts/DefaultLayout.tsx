import { CodeSandboxOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Typography } from 'antd'
import { MenuProps } from 'antd/lib'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app'
import { ReactWithChild } from 'src/interface/app'

export default function DefaultLayout({ children }: ReactWithChild) {
  const { profile, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`)
    if (key === '2') {
      navigate('/dev-mode')
    }
    if (key === '3') {
      setProfile(null)
      localStorage.removeItem('profile')
      navigate('/login')
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <Avatar>{profile?.user_name.slice(0, 1).toLocaleUpperCase()}</Avatar>
          <Typography.Text className='ml-2 font-bold'>{profile?.user_name}</Typography.Text>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <span>
          <CodeSandboxOutlined className='mr-2' /> Trang code của tôi
        </span>
      )
    },
    {
      key: '3',
      label: (
        <span className='text-black text-le'>
          <LogoutOutlined className='mr-2' /> Đăng xuất
        </span>
      )
    }
  ]
  return (
    <>
      <nav className='container w-full h-12 px-4 flex items-center justify-between'>
        <Typography className='text-lg text-emerald-500 font-bold'>VieLang</Typography>
        <div className='flex items-center'>
          <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
            <Avatar>{profile?.user_name.slice(0, 1).toLocaleUpperCase()}</Avatar>
          </Dropdown>
        </div>
      </nav>
      {children}
    </>
  )
}
