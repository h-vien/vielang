import { CaretRightOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { transpiler } from '@vielang/parser'
import { Button, Tabs, TabsProps } from 'antd'
import { useEffect, useState } from 'react'
import { supabase } from 'src/utils/supabase'
import TestCases from './TestCases'
import TestResults from './TestResults'
import { formatFunctionName } from 'src/utils/utils'

interface Props {
  id: string
  program: string
  fnName: string
}
export default function Results({ id, program, fnName }: Props) {
  console.log(fnName, 'fnName')
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }])

  const [activeTab, setActiveTab] = useState('1')
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
    getTestCases()
  }, [id])

  console.log({ testCases })

  const runTests = () => {
    const results = testCases.slice(0, 4).map((testCase) => {
      let result
      try {
        const _program = transpiler.compile(program)

        // eslint-disable-next-line no-new-func
        const func = new Function('input', _program.target + `\nreturn ${formatFunctionName(fnName)}(input);`)
        const output = func(testCase.input)
        result = String(output)
      } catch (error) {
        result = `Error: ${error}`
      }
      return { ...testCase, result }
    })
    console.log(results, 'results')
    setResults(results)
    setActiveTab('2')
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Các trường hợp kiểm thử',
      children: <TestCases testCases={structuredClone(testCases)} />
    },
    { key: '2', label: 'Kết quả', disabled: activeTab !== '2', children: <TestResults results={results ?? []} /> }
  ]

  return (
    <div>
      <Button type='default' onClick={runTests} shape='default'>
        <CaretRightOutlined size={10} /> Chạy thử
      </Button>
      <Button type='primary' onClick={runTests} shape='default' className='ml-2'>
        <CloudUploadOutlined size={10} /> Nộp bài
      </Button>
      <Tabs defaultActiveKey={'1'} onChange={(key) => setActiveTab(key)} activeKey={String(activeTab)} items={items} />
    </div>
  )
}
