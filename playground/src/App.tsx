import { CaretRightOutlined, CheckOutlined, CopyOutlined, LoadingOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Editor, { useMonaco } from '@monaco-editor/react'
import { createClient } from '@supabase/supabase-js'
import { transpiler } from '@vielang/parser'
import { Button, Card, Col, Divider, Drawer, Row, Tag } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createDependencyProposals } from './editor/autocomplete'
import { languageExtensionPoint, languageID } from './editor/config'
import { monarchLanguage, richLanguageConfiguration } from './editor/vielang'
import { sortBy } from 'lodash'

const supabase = createClient(
  'https://inkryqrjlvcrdegmzhwi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlua3J5cXJqbHZjcmRlZ216aHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2OTM2MDMsImV4cCI6MjAzMTI2OTYwM30.yRNvV1M8deeQbJf1dZXBlLSla22G0TC7c6gux8qCVlw'
)

function App() {
  const [problems, setProblems] = useState<any[]>([])
  const [program, setProgram] = useState('')
  const [selectedProblem, setSelectedProblem] = useState<any>()
  const [result, setResult] = useState('')
  const [open, setOpen] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const monaco = useMonaco()

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onCompile = async () => {
    const _program = transpiler.compile(program)
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
  const getProblems = async () => {
    const { data: problems, error } = await supabase.from('problems').select('*')
    if (problems) {
      setProblems(problems)
      setSelectedProblem(problems.find((problem) => problem.serial === 1))
    }
    if (error) toast(error.message, { type: 'error' })
  }
  useEffect(() => {
    getProblems()
  }, [])
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
      <div className='flex z-30 items-center w-full justify-center mb-5'>
        <Button size='small' onClick={showDrawer} className='mr-2'>
          <MenuUnfoldOutlined size={10} /> Bài tập
        </Button>
        <Button size='small' onClick={onCompile} shape='default'>
          <CaretRightOutlined size={10} /> Thực thi
        </Button>
      </div>
      <Row className='pt-3'>
        <Col span={12}>
          <div className='bg-zinc-100 text-xl w-full p-12 h-full rounded-lg '>
            <h3>
              {selectedProblem?.serial}. {selectedProblem?.title}
            </h3>
            <div className='my-5'>
              <Tag className='rounded-full capitalize cursor-pointer' color='blue'>
                {selectedProblem?.difficulty}
              </Tag>
              <Tag className='rounded-full capitalize cursor-pointer' color='green'>
                {selectedProblem?.tag}
              </Tag>
            </div>
            <p className='mt-12 text-xl'>{selectedProblem?.meta_data.description}</p>
            <div className='my-12'>
              <p className='font-bold text-xl'> Đầu vào</p>
              <p className='border rounded-lg bg-gray-200 p-5 mt-2'>{selectedProblem?.meta_data.input}</p>
            </div>
            <div className='my-12'>
              <p className='font-bold text-xl'> Đầu ra</p>
              <p className='border rounded-lg bg-gray-200 p-5 mt-2'>{selectedProblem?.meta_data.output}</p>
            </div>
            <div>
              <p className='font-bold'>Code mẫu</p>
              <div className='border rounded-lg bg-gray-200 mt-4 relative'>
                <Button
                  size='small'
                  className='absolute right-2 top-2'
                  onClick={() => {
                    setIsCopy(true)
                    navigator.clipboard.writeText(selectedProblem?.code)
                    setTimeout(() => setIsCopy(false), 2000)
                  }}
                >
                  {isCopy ? <CheckOutlined /> : <CopyOutlined />}
                </Button>
                <pre className='block p-5'>{JSON.parse(JSON.stringify(selectedProblem?.code ?? '', null, 2))}</pre>
              </div>
            </div>
          </div>
        </Col>
        <Col span={12} className='px-8 h-screen '>
          <Editor height='50vh' value={program} language='vielang' onChange={handleEditorChange} />

          <>
            <Divider />
            <h2>Kết quả</h2>
            <div className='border min-h-32 w-full p-4 mt-1 rounded-md border-solid'>
              {isLoading ? (
                <LoadingOutlined />
              ) : (
                <>{result ? JSON.parse(JSON.stringify(result)) : 'Nhấn nút "thực thi" để biên dịch code'}</>
              )}
            </div>
          </>
        </Col>
      </Row>
      <Drawer title='Danh sách bài tập' placement='left' onClose={onClose} open={open}>
        {sortBy(problems, 'serial').map((problem) => (
          <button
            key={problem.id}
            onClick={() => {
              setSelectedProblem(problem)
              onClose()
            }}
            className='block p-2 border-none w-full text-left bg-transparent outline-none my-8 hover:bg-gray-200 cursor-pointer'
          >
            <p>
              {problem.serial}. {problem.title}
            </p>
          </button>
        ))}
      </Drawer>

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
