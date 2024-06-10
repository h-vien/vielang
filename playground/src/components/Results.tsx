import { CaretRightOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { transpiler } from '@vielang/parser'
import { Button, Tabs, TabsProps } from 'antd'
import { useContext, useEffect, useState } from 'react'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/context/app'
import { supabase } from 'src/utils/supabase'
import { formatFunctionName } from 'src/utils/utils'
import TestCases from './TestCases'
import TestResults from './TestResults'

interface Props {
  id: string
  program: string
  fnName: string
  setIsSubmitted: (isSubmitted: boolean) => void
}

interface TestCase {
  input: string
  expectedOutput: string
}
export default function Results({ id, program, fnName, setIsSubmitted }: Props) {
  const { profile } = useContext(AppContext)
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }])

  const [activeTab, setActiveTab] = useState('1')
  const [time, setTime] = useState(0)
  const [memory, setMemory] = useState(0)
  const [results, setResults] = useState<
    {
      input: string
      expectedOutput: string
      result: string
    }[]
  >()
  const getTestCases = async () => {
    const { data, error } = await supabase.from('test_cases').select('*').eq('problem_id', id)
    setTestCases(data?.[0].test_cases)
  }
  useEffect(() => {
    setActiveTab('1')
    getTestCases()
  }, [id])

  const runTests = (testCases: TestCase[]) => {
    const results = testCases.map((testCase) => {
      let result
      try {
        const _program = transpiler.compile(program)

        // eslint-disable-next-line no-new-func
        const func = new Function('input', _program.target + `\nreturn ${formatFunctionName(fnName)}(input);`)

        const output = func(JSON.parse(testCase.input))
        result = String(output)
      } catch (error) {
        result = `Error: ${error}`
      }
      return { ...testCase, result }
    })
    setActiveTab('2')
    return results
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Các trường hợp kiểm thử',
      children: <TestCases testCases={structuredClone(testCases)} />
    },
    {
      key: '2',
      label: 'Kết quả',
      disabled: activeTab !== '2',
      children: <TestResults time={time} memory={memory} results={results ?? []} />
    }
  ]

  const handleRunCode = () => {
    let memoryStart, memoryEnd
    const timeStart = performance.now()
    if ((performance as any).memory) {
      memoryStart = (performance as any).memory.usedJSHeapSize
    }
    const results = runTests(testCases.slice(0, 4))
    setResults(results)

    const timeEnd = performance.now()
    if ((performance as any).memory) {
      memoryEnd = (performance as any).memory.usedJSHeapSize
    } else {
      memoryStart = memoryEnd = 'N/A'
    }
    setMemory(memoryEnd - memoryStart)
    setTime(timeEnd - timeStart)
  }

  const handleSubmit = async () => {
    let memoryStart, memoryEnd
    const timeStart = performance.now()
    if ((performance as any).memory) {
      memoryStart = (performance as any).memory.usedJSHeapSize
    }
    const results = runTests(testCases)
    const timeEnd = performance.now()
    if ((performance as any).memory) {
      memoryEnd = (performance as any).memory.usedJSHeapSize
    } else {
      memoryStart = memoryEnd = 'N/A'
    }
    const memory = memoryEnd - memoryStart
    const time = timeEnd - timeStart
    if (results?.every((result) => String(result.result) === result.expectedOutput)) {
      await authApi.submit({
        problem_id: id,
        user_id: profile?.id,
        program,
        time: time.toFixed(2),
        memory
      })
      setIsSubmitted(true)
    }
  }

  return (
    <div>
      <Button type='default' onClick={handleRunCode} shape='default'>
        <CaretRightOutlined size={10} /> Chạy thử
      </Button>
      <Button
        type='primary'
        onClick={handleSubmit}
        disabled={!results?.every((result) => String(result.result) === result.expectedOutput)}
        shape='default'
        className='ml-2'
      >
        <CloudUploadOutlined size={10} /> Nộp bài
      </Button>
      <Tabs defaultActiveKey={'1'} onChange={(key) => setActiveTab(key)} activeKey={String(activeTab)} items={items} />
    </div>
  )
}
