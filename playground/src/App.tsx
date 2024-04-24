import useRouteElements from './useRoutesElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'
import { Card } from 'antd'

function App() {
  const routeElements = useRouteElements()
  return (
    <Card>
      {/* {routeElements} */}
      <Editor height='90vh' defaultLanguage='javascript' defaultValue='// some comment' />
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
    </Card>
  )
}

export default App
