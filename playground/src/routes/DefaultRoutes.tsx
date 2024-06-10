import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import DefaultLayout from 'src/components/layouts/DefaultLayout'
import { AppContext } from 'src/context/app'

function DefaultRoute() {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!profile) {
      navigate('/login')
    }
  }, [navigate, profile])
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default DefaultRoute
