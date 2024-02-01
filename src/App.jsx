import { useCallback, useEffect, useState, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [specialsAllowed, setSpecialsAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState("copy")
  const [color, setColor] = useState("#40A2D8")

  const passRef = useRef(null)

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const specials = "!@#$%^&*(){}[]|~`"
    const nums = "0123456789"
    let pass = ""
    if(specialsAllowed) str += specials
    if(numbersAllowed) str += nums
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numbersAllowed, specialsAllowed, setPassword])

  const copyToClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  },
  [password])

  const copyPassword = () => {
    setCopied("copied!")
    setColor("green")
    copyToClipboard()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numbersAllowed, specialsAllowed, generatePassword])


  return (
    <div style={{backgroundColor: "#0B60B0", color: "#000000"}} className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8">
      <h1 style={{color: "#F0EDCF"}} className='text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          readOnly
          placeholder='Enter password' 
          ref={passRef}
        />
        <button style={{backgroundColor: color}} className='outline-none text-white px-3 py-0.5 
        shrink-0'
          onClick={copyPassword}>{copied}</button>
      </div>
      <div className='flex text-sm gap-x-2 pb-3'>
        <div className="flex item-center gap-x-1">
          <input 
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Lenght: {length}</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input 
            type='checkbox'
            defaultChecked={numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input 
            type='checkbox'
            defaultChecked={specialsAllowed}
            onChange={() => setSpecialsAllowed((prev) => !prev)}
          />
          <label>Specials</label>
        </div>
      </div>
    </div>
  )
}

export default App
