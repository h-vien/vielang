import { LoadingOutlined } from '@ant-design/icons'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { parser, transpiler } from '@vielang/parser'
import { Button, Card, Col, Divider, Row } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [program, setProgram] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onCompile = async () => {
    const _program = transpiler.compile(program)
    const result = eval('let a = 1; console.log(a)').then((res) => console.log(res, 'this log res'))
    console.log(result, 'result')
    // try {
    //   setIsLoading(true)
    //   const res = await axios.post('https://emkc.org/api/v2/piston/execute', {
    //     language: 'js',
    //     version: '18.15.0',
    //     files: [
    //       {
    //         content: _program.target
    //       }
    //     ]
    //   })
    //   setResult(res.data.run.output)
    // } catch (err) {
    //   console.log(err)
    // } finally {
    //   setIsLoading(false)
    // }
  }
  function handleEditorChange(value: any) {
    console.log(value)
    setProgram(value)
    // here is the current value
  }

  return (
    <Card>
      <Row>
        <Col span={12}>
          <CodeEditor
            value={program}
            language='js'
            placeholder='Please enter JS code.'
            onChange={(evn) => handleEditorChange(evn.target.value)}
            padding={15}
            style={{
              backgroundColor: '#232D3F',
              fontSize: 18,
              height: '100vh',
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
            }}
          />
        </Col>
        <Col span={10} className='p-8 text-white'>
          <Button onClick={onCompile} shape='default'>
            Run Code
          </Button>
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <>
              {' '}
              <Divider />
              <h2>Result</h2>
              <div className='border min-h-32 w-full p-4 mt-1 border-solid'>
                {result ? result : 'Click "Run" to compile code'}
              </div>
            </>
          )}
        </Col>
      </Row>
      {/* {routeElements} */}
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
