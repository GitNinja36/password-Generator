import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pasword, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
//useRef hook
const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="123456789"
    if(charAllowed) str+="!@#$%^&*_-"
    for(let i =1; i <= length; i++){
      let randomNumber = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pasword);
    setIsClicked(true);
  }, [pasword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='h-auto w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-8 text-green-500 bg-gray-600 flex flex-col'>
        <h1 className='text-2xl text-center mb-3 mt-1 text-sky-500'>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={pasword}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 ' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-3 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={3}
              max={18}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() =>{
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() =>{
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Charactor</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
