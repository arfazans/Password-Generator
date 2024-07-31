import { useCallback, useEffect, useRef, useState } from "react"

function App() {
   const [length, setLength] = useState(8)
   const [numberAllowed, setNumberAllowed] = useState(false)
   const [charAllowed, setCharAllowed] = useState(false)
   const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
        let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()<>?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * (str.length - 1) + 1)
       pass += str[char] 
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 50)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="bg-[url('/back.jpg')] bg-cover bg-center w-full h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="bg-slate-400 p-6 text-center rounded-lg border-double border-4 shadow-2xl  border-indigo-600">
            <h1 className="p-5 font-bold font-serif text-xl	">Password Generator</h1>
            <input
              className="p-1 w-96 mb-4"
              type="text"
              value={password}
              placeholder="Password"
              ref={passwordRef}
              readOnly
            />
            <button
              onClick={copyPasswordToClipboard}
              className="border bg-blue-600 mx-1 p-1 px-5 rounded-lg text-white"
            >
              Copy
            </button>
          <div className="mt-5">
            <input 
              type="range" 
              min={6} 
              max={50} 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              /> 
            <label className="px-4" htmlFor="Length">Length: {length}</label>
            <input 
              type="checkbox"  
              checked={numberAllowed} 
              id="numberInput"  
              onChange={() => setNumberAllowed(prev => !prev)}
              />
            <label className="px-4" htmlFor="numberInput">Number </label>
            <input 
              type="checkbox" 
              checked={charAllowed} 
              id="characterInput" 
              onChange={() => setCharAllowed(prev => !prev)} 
              />
            <label className="px-4" htmlFor="characterInput">Character</label>
          </div>
              </div>
        </div>
      </div>
    </>
  )
}

export default App


