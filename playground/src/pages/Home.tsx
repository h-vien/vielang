import { CheckOutlined, CopyOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Editor, useMonaco } from '@monaco-editor/react'
import { Button, Card, Col, Collapse, Drawer, Row, Switch, Tag } from 'antd'
import { sortBy } from 'lodash'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Results from 'src/components/Results'
import { createDependencyProposals } from 'src/editor/autocomplete'
import { languageExtensionPoint, languageID } from 'src/editor/config'
import { monarchLanguage, richLanguageConfiguration } from 'src/editor/vielang'
import { supabase } from 'src/utils/supabase'

const MOCK_DATA = [
  {
    id: 'test_1',
    serial: 1,
    created_at: '2024-05-26T13:31:09.945224+00:00',
    title: 'Demo switch case',
    code: 'khai báo tuổi tác = 12;\n    duyệt(tuổi tác){\n        trường hợp 20: \n            in ra("bạn 20 tuổi");\n            phá huỷ;\n        trường hợp 12: \n            in ra("bạn 12 tuổi");\n            phá huỷ;\n        mặc định: \n            in ra("mặc định ở ");\n    }'
  },
  {
    id: 'test_2',
    serial: 2,
    created_at: '2024-05-26T13:31:09.945224+00:00',
    title: 'Demo for statement',
    code: 'lặp(khai báo i = 0 ;i < 5 ; i++){\n      in ra(i)\n  }'
  },
  {
    id: 'test_3',
    serial: 3,
    created_at: '2024-05-26T13:31:09.945224+00:00',
    title: 'Demo while statement',
    code: 'khai báo a = 0;\n  khi mà (a < 4){\n    in ra (a)\n    a++\n  }'
  }
]

export default function Home() {
  const [problems, setProblems] = useState<any[]>([])
  const [program, setProgram] = useState('')
  const [selectedProblem, setSelectedProblem] = useState<any>()
  const [result, setResult] = useState('')
  const [open, setOpen] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const monaco = useMonaco()
  console.log(selectedProblem, 'selectedProblem')
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
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
      <div className='flex relative z-30 items-center w-full justify-center mb-5'>
        <Button size='small' onClick={showDrawer} className='mr-2'>
          <MenuUnfoldOutlined size={10} /> Bài tập
        </Button>
      </div>
      <Row className='pt-3'>
        <Col span={12}>
          <div className='bg-zinc-100 text-lg w-full p-12 h-full rounded-lg '>
            <>
              {' '}
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
            <Results id={selectedProblem?.id} program={program} fnName={selectedProblem?.meta_data.functionName} />
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
            <p>
              {problem.serial}. {problem.title}
            </p>
          </button>
        ))}
      </Drawer>
    </Card>
  )
}
