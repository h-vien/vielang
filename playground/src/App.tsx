import { LoadingOutlined } from '@ant-design/icons'
import Editor, { useMonaco } from '@monaco-editor/react'
import { transpiler } from '@vielang/parser'
import { Button, Card, Col, Divider, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createDependencyProposals } from './editor/autocomplete'
import { languageExtensionPoint, languageID } from './editor/config'
import { monarchLanguage, richLanguageConfiguration } from './editor/vielang'

function App() {
  const [program, setProgram] = useState('')
  const [result, setResult] = useState('')

  const monaco = useMonaco()

  const [isLoading, setIsLoading] = useState(false)
  const onCompile = async () => {
    const _program = transpiler.compile(program)
    setResult(_program.target)
    try {
      setIsLoading(true)
      const res = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: 'js',
        version: '18.15.0',
        files: [
          {
            content: _program.target
          }
        ]
      })
      setResult(res.data.run.output)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  function handleEditorChange(value: any) {
    setProgram(value)
    // here is the current value
  }

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    monaco?.languages.register(languageExtensionPoint)
    monaco?.languages.onLanguage(languageID, () => {
      monaco?.languages.setMonarchTokensProvider(languageID, monarchLanguage)
      monaco?.languages.setLanguageConfiguration(languageID, richLanguageConfiguration)
      console.log('this log', monaco.languages.getLanguages(), 'logo day?')
    })

    monaco?.languages.registerCompletionItemProvider(languageID, {
      provideCompletionItems: function (model, position) {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        }
        return {
          suggestions: createDependencyProposals(range, monaco)
        }
      }
    })

    if (monaco) {
      console.log('here is the monaco instance:', monaco)
    }
  }, [monaco])

  return (
    <Card>
      <Row>
        <Col span={12}>
          <Editor height='90vh' value={program} theme='vs-dark' language='vielang' onChange={handleEditorChange} />
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
              {}
              <Divider />
              <h2>Result</h2>
              <div className='border min-h-32 w-full p-4 mt-1 border-solid'>
                {result ? JSON.parse(JSON.stringify(result)) : 'Click "Run" to compile code'}
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
