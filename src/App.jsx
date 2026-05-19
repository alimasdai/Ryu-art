import { useState } from 'react'
import Header from './components/Header'
import Content from './components/Content'

function App() {

  return (
    <>
      <div className='min-h-screen overflow-x-hidden w-screen'>
        <Header/>
        <Content/>
      </div>
    </>
  )
}

export default App
