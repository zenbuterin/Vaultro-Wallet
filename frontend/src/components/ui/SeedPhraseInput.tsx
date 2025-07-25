'use client'
import * as bip39 from "bip39"
import { useEffect, useRef, useState } from "react"

export const SeedPhraseInput = ({ typeSeed }: {typeSeed : string}) => {
  const [typeOfSeedPhraseOperation, setTypeOfSeedPhraseOperation] = useState<string>("");  
  const [numberOfSeed, setNumberOfSeed] = useState<number>(12);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleToggle = () => {
    if (numberOfSeed == 12) {
      setNumberOfSeed(24)
      console.log("number of seed 24")
    }
    else {
      setNumberOfSeed(12)
      console.log("number of seed 12")
    }
  };

  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const words = text.trim().split(/\s+/); // split by spasi atau enter

    if (words.length === 12) {
      words.forEach((word, idx) => {
        if (inputsRef.current[idx]) {
          inputsRef.current[idx]!.value = word;
        }
      });
      e.preventDefault();
    }
  };

  function handleInputSeed () {
    if (typeSeed == "SeedPhraseImport") {
      setTypeOfSeedPhraseOperation("SeedPhraseImport");

      
    }
    else if (typeSeed == "SeedPhraseCreate") {
      setTypeOfSeedPhraseOperation("SeedPhraseCreate");
    }
  } 
  
  useEffect( () => handleInputSeed(), []);
  
  return (
    <div>
    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
    { numberOfSeed ? Array.from({length : numberOfSeed}).map((_, i) => (
      <input className="border-black-50" key={i} id={String(i)} type="text" placeholder={"Seed #" + i} onPaste={i <= numberOfSeed ? handlePaste : undefined} 
          ref={(el) => {inputsRef.current[i] = el}}></input>
    )) : <span>Input Kosong</span>}
    </div>
    
    <div>
         <span className="text-gray-600 font-medium">12 Seed</span>
          
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              numberOfSeed == 12 ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                numberOfSeed == 24 ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          
          <span className="text-gray-600 font-medium">24 Seed</span>
    </div>
    </div>
  )
}
