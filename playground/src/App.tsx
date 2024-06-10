import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRoutesElement'
import { ConfigProvider } from 'antd'
import { theme } from './configs/antd.config'
import { AppProvider } from './context/app'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <ConfigProvider theme={theme}>
        <AppProvider>
          {routeElements}
          <ToastContainer
            position='top-right'
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme='light'
          />
        </AppProvider>
      </ConfigProvider>
    </>
  )
}

export default App
