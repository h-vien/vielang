import { CheckOutlined, CopyOutlined, MacCommandOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Editor, useMonaco } from '@monaco-editor/react'
import { Button, Card, Col, Collapse, Drawer, Row, Tag } from 'antd'
import { sortBy } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Results from 'src/components/Results'
import { AppContext } from 'src/context/app'
import { createDependencyProposals } from 'src/editor/autocomplete'
import { languageExtensionPoint, languageID } from 'src/editor/config'
import { monarchLanguage, richLanguageConfiguration } from 'src/editor/vielang'

const MOCK_DATA = [
  {
    id: 'test_1',
    serial: 1,
    created_at: '2024-05-26T13:31:09.945224+00:00',
    title: 'Tính tổng từ 1 đến n',
    code: 'hàm Tính tổng (n){ \n    khai báo kq= 1\n    lặp (khai báo i =2; i<= n; i++) {\n        kq = kq + i;\n    }\n    trả về kq\n}',
    meta_data: {
      functionName: 'Tính tổng',
      params: '(n)',
      description: 'Tính tổng từ 1 đến số n',
      input: 4,
      output: 10
    },
    tag: 'number',
    difficulty: 'easy'
  }
]

export default function Home() {
  const [problems, setProblems] = useState<any[]>([])
  const [program, setProgram] = useState('')
  const [selectedProblem, setSelectedProblem] = useState<any>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [result, setResult] = useState('')
  const [open, setOpen] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const monaco = useMonaco()

  const { profile } = useContext(AppContext)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const getProblems = async () => {
    // const { data: problems, error } = await authApi.getProblems(profile?.id ?? '')
    const problems = MOCK_DATA
    if (problems) {
      setProblems(problems)
      setSelectedProblem(problems.find((problem) => problem.serial === 1))
    }
    // if (error) toast(error.message, { type: 'error' })
  }

  useEffect(() => {
    getProblems()
  }, [isSubmitted])

  function handleEditorChange(value: any) {
    setProgram(value)
    // here is the current value
  }

  useEffect(() => {
    setProgram(`hàm ${selectedProblem?.meta_data.functionName} ${selectedProblem?.meta_data.params}{ \n \n \n}`)
  }, [selectedProblem])

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
      <Row className='pt-3'>
        <Col span={12}>
          <div className='bg-zinc-100 text-lg w-full px-12 py-4 h-full rounded-lg '>
            <>
              <Button onClick={showDrawer} className='mr-2 mb-5'>
                <MenuUnfoldOutlined size={10} /> Bài tập
              </Button>

              <Link to='/dev-mode'>
                <Button onClick={showDrawer} className='mr-2 mb-5'>
                  <MacCommandOutlined size={10} /> Chế độ phát triển
                </Button>
              </Link>
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
              <p className='mt-12 text-lg'>{selectedProblem?.meta_data?.description}</p>
              <div className='my-12'>
                <p className='font-bold text-lg'> Đầu vào</p>
                <p className='border rounded-lg bg-gray-200 p-5 mt-2'>{selectedProblem?.meta_data?.input}</p>
              </div>
              <div className='my-12'>
                <p className='font-bold text-lg'> Đầu ra</p>
                <p className='border rounded-lg bg-gray-200 p-5 mt-2'>{selectedProblem?.meta_data?.output}</p>
              </div>
              <div>
                <p className='font-bold text-lg mb-4'> Code mẫu</p>

                <Collapse
                  size='small'
                  items={[
                    {
                      key: '1',
                      label: 'Xem đáp án',
                      children: (
                        <div className='border rounded-lg overflow-auto bg-gray-200 mt-4 relative'>
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
                          <pre className='block p-5'>
                            {JSON.parse(JSON.stringify(selectedProblem?.code ?? '', null, 2))}
                          </pre>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            </>
          </div>
        </Col>
        <Col span={12} className='px-8 h-screen '>
          <Card>
            <Editor
              height='50vh'
              value={program}
              options={{
                scrollBeyondLastLine: false,
                fontSize: 16
              }}
              language='vielang'
              onChange={handleEditorChange}
            />
          </Card>

          <Card className='mt-2'>
            <Results
              id={selectedProblem?.id}
              setIsSubmitted={setIsSubmitted}
              program={program}
              fnName={selectedProblem?.meta_data.functionName}
            />
          </Card>
        </Col>
      </Row>
      <Drawer title='Danh sách bài tập' placement='left' onClose={onClose} open={open}>
        {sortBy(problems, 'serial').map((problem) => (
          <button
            key={problem.id}
            onClick={() => {
              setResult('')
              setProgram('')
              setSelectedProblem(problem)
              onClose()
            }}
            className='block p-2 border-none w-full text-left bg-transparent outline-none my-8 hover:bg-gray-200 cursor-pointer'
          >
            <div className='flex items-center justify-between'>
              <p>
                {problem.serial}. {problem.title}
              </p>
              {problem.isSubmitted && <CheckOutlined size={20} className='block font-bold text-emerald-500' />}
            </div>
          </button>
        ))}
      </Drawer>
    </Card>
  )
}
