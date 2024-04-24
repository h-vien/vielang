import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex items-center justify-center flex-col bg-zinc-800 w-full min-h-screen'>
      <img src='/vite.svg' alt='React Vite - Vien Huynh' className='h-24 mb-4' />
      <span className='text-indigo-500 font-sans font-bold mb-4'>
        My Website:
        <Link className='text-indigo-500 font-sans ml-2 no-underline' to='https://vienhuynh.dev/' target='_blank'>
          vienhuynh.dev
        </Link>
      </span>
      <h1 className='font-sans text-white'>React.js + Tailwind CSS + TypeScript + React-Query Starter</h1>
      <p className='text-white mt-4 font-sans'>
        A starter for React.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured
        with Husky, Lint
      </p>
      <Link
        to='https://github.com/N3iV/react-ts-tailwind-vitest-boilerplate'
        target='_blank'
        className='underline font-sans text-white mt-4'
      >
        See the repository on Github
      </Link>
    </div>
  )
}
