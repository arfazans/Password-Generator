import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-[url('/back.jpg')] bg-cover bg-center w-full min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-400 p-6 text-center rounded-lg border-double border-4 shadow-2xl border-indigo-600 w-full max-w-md">
        <h1 className="p-5 font-bold font-serif text-xl">Password Generator</h1>
        <input
          className="p-2 w-full mb-4 border rounded-md text-center"
          type="text"
          value={password}
          placeholder="Password"
          ref={passwordRef}
          readOnly
        />
        <button
          onClick={copyPasswordToClipboard}
          className="border bg-blue-600 w-full p-2 rounded-lg text-white hover:bg-blue-700"
        >
          Copy
        </button>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center w-full">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
            <label className="mt-2">Length: {length}</label>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
