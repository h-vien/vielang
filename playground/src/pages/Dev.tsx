import { CaretRightOutlined } from '@ant-design/icons'
import Editor, { useMonaco } from '@monaco-editor/react'
import { transpiler } from '@vielang/parser'
import { Button, Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ERRORS, RESULTS } from 'src/constants/error.const'
import { createDependencyProposals } from 'src/editor/autocomplete'
import { languageExtensionPoint, languageID } from 'src/editor/config'
import { monarchLanguage, richLanguageConfiguration } from 'src/editor/vielang'

function Dev() {
  const [program, setProgram] = useState('')
  const [result, setResult] = useState('')
  const monaco = useMonaco()

  function handleEditorChange(value: any) {
    setProgram(value)
    // here is the current value
  }

  const executeCode = () => {
    let capturedOutput = ''
    const originalConsoleLog = console.log

    console.log = (output) => {
      capturedOutput += output
    }

    try {
      const _program = transpiler.compile(program)
      eval(_program.target)
      setResult(RESULTS[capturedOutput as keyof typeof RESULTS] || capturedOutput)
    } catch (error) {
      setResult(`Lỗi: ${ERRORS[error as keyof typeof ERRORS] || error}`)
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog
    }
  }

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    monaco?.languages.register(languageExtensionPoint)
    monaco?.editor.defineTheme('myCoolTheme', {
      base: 'vs',
      inherit: false,
      rules: [
        { token: 'string.invalid', foreground: '808080' },
        { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
        { token: 'custom-notice', foreground: 'FFA500' },
        { token: 'custom-date', foreground: '008800' }
      ],
      colors: {
        'editor.foreground': '#000000'
      }
    })
    monaco?.languages.onLanguage(languageID, () => {
      monaco?.languages.setMonarchTokensProvider(languageID, monarchLanguage)
      monaco?.languages.setLanguageConfiguration(languageID, richLanguageConfiguration)
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
      <div className='flex z-30 items-center w-full justify-center mb-5'>
        <Button onClick={executeCode} shape='default'>
          <CaretRightOutlined size={10} /> Thực thi
        </Button>
      </div>
      <Row className='pt-3'>
        <Col span={16} className='px-8 h-screen '>
          <Card className='shadow'>
            <Editor height='100vh' value={program} language='vielang' onChange={handleEditorChange} />
          </Card>
        </Col>
        <Col span={8}>
          <h2>Kết quả</h2>
          <div className='border min-h-32 w-full p-4 mt-1 rounded-md border-solid'>
            <>{result ? JSON.parse(JSON.stringify(result)) : 'Nhấn nút "thực thi" để biên dịch code'}</>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Dev
