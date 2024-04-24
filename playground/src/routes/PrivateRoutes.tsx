import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import PrivateLayout from 'src/components/layouts/PrivateLayout'

function PrivateRoute() {
  // const [havePermission, setHavePermission] = useState(false) // Sau ni dung accessToken

  useEffect(() => {
    //handle redirect o day
  }, [])

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  )
}

export default PrivateRoute
