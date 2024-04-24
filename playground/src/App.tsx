import Editor from '@monaco-editor/react'
import { Card } from 'antd'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import vl from 'vielang-v1'

function App() {
  useEffect(() => {
    const test = `khai báo a =1`
    const ast = vl.parse(test)
    console.log(ast)
  }, [])
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
