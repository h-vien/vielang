import { Segmented, Tabs } from 'antd'
import { useState } from 'react'

interface Props {
  results: {
    input: string
    expectedOutput: string
    result: string
  }[]
}

export default function TestResults({ results }: Props) {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <div>
      <div className='mb-4'>
        {results.every((result) => String(result.result) === result.expectedOutput) ? (
          <span className='font-bold text-xl text-emerald-600'>Thành công</span>
        ) : (
          <span className='font-bold text-xl text-red-500'>Thất bại</span>
        )}
      </div>
      {results && (
        <Segmented<string>
          options={results.map((result, i) => ({
            label: (
              <div className='flex items-center'>
                <span
                  className={`w-2 h-2 ${
                    result.expectedOutput === String(result.result) ? 'bg-emerald-400' : 'bg-red-500'
                  } rounded-full mr-2`}
                ></span>
                <p className='text-gray-600'>{`Kiểm thử ${i + 1}`}</p>
              </div>
            ),
            value: String(i + 1)
          }))}
          onChange={(value) => {
            setActiveTab(value)
          }}
        />
      )}
      {activeTab && (
        <div className='mt-4'>
          <span>Đầu vào</span>
          <div className='border rounded-md bg-gray-100 p-4'>
            <pre>{results[Number(activeTab) - 1]?.input}</pre>
          </div>
          <br />
          <span>Kết quả</span>
          <div
            className={`border font-bold rounded-md bg-gray-100 p-4 ${
              String(results[Number(activeTab) - 1]?.result) === results[Number(activeTab) - 1]?.expectedOutput
                ? 'text-emerald-600'
                : 'text-red-500'
            }`}
          >
            <pre>{results[Number(activeTab) - 1]?.result}</pre>
          </div>
          <br />
          <span>Kết quả mong muốn</span>
          <div className='border rounded-md bg-gray-100 p-4'>
            <pre>{results[Number(activeTab) - 1]?.expectedOutput}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
