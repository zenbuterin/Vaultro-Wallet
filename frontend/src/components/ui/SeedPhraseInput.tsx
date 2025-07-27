'use client'
import * as bip39 from "bip39"
import { useEffect, useRef, useState } from "react"

export const SeedPhraseInput = ({ typeSeed }: {typeSeed : string}) => {
  const [typeOfSeedPhraseOperation, setTypeOfSeedPhraseOperation] = useState<string>("");  
  const [numberOfSeed, setNumberOfSeed] = useState<number>(12);
  const [seedWords, setSeedWords] = useState<(string)[]>([])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleToggle() {
    if (numberOfSeed == 12) {
      setNumberOfSeed(24)
      console.log("number of seed 24")
    }
    else {
      setNumberOfSeed(12)
      console.log("number of seed 12")
    }
  };



  function numberSeedToEntropy(numberofseed: number): number  {
    if (numberOfSeed == 12) {
      return 128;
    }
    else if (numberofseed == 24) {
      return 256;
    }
    return 0
  }

  function handleCreateSeedPhrase(numberofseed: number): string[] {
    const entropy = numberSeedToEntropy(numberofseed)
    const seedPhrase = bip39.generateMnemonic(entropy);
    const words = seedPhrase.trim().split(/\s+/);
    //put seedphrase to state
    setSeedWords(words)
    return words;
   
  }


  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    const words = text.trim().split(/\s+/); // split by spasi atau enter
    //put seedphrase to state

    if (words.length === 12 || words.length === 24) {
      words.forEach((word, idx) => {
        if (inputsRef.current[idx]) {
          inputsRef.current[idx]!.value = word;
        }
      });
      e.preventDefault();
    }
  };

  function handleTypeOfInputSeed () {
    if (typeSeed == "SeedPhraseImport") {
      setTypeOfSeedPhraseOperation("SeedPhraseImport"); 
    }
    else if (typeSeed == "SeedPhraseCreate") {
      setTypeOfSeedPhraseOperation("SeedPhraseCreate");
    }
  } 
  
  useEffect( () => handleTypeOfInputSeed(), []);

  useEffect(() => {
    if (typeOfSeedPhraseOperation == "SeedPhraseCreate") { 
      handleCreateSeedPhrase(numberOfSeed)
    } 
  }, [numberOfSeed])

  useEffect(() => {
    if (typeOfSeedPhraseOperation == "SeedPhraseImport") {
      const words = inputsRef.current.map((input) => input?.value || "");
      setSeedWords(words)
    }
  } , [seedWords])



    
  
  return (
    <div>
    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
    {/*ini untuk seed phrase yang di import*/}
    {
    typeOfSeedPhraseOperation === "SeedPhraseImport"
       ? Array.from({ length: numberOfSeed }).map((_, i) => (
          <input
            className="border-black-50"
            key={i}
            id={String(i)}
            type="text"
            placeholder={"Seed #" + i}
            onPaste={i <= numberOfSeed ? handlePaste : undefined}
            ref={(el) => { inputsRef.current[i] = el }}
            />
          ))
        : typeOfSeedPhraseOperation === "SeedPhraseCreate" && 
          seedWords.map((word, indx) => (
          <div key={indx}><span>{word}</span></div>
        ))  
     }
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
