import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Sandbox } from './components/sandbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sandbox></Sandbox>
      
    </>
  )
}

export default App
