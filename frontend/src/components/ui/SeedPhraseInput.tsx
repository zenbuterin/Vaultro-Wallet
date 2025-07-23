'use client'
import { useEffect, useState } from "react"

export const SeedPhraseInput = ({ typeSeed }: {typeSeed : string}) => {
  const [typeOfSeedPhraseOperation, setTypeOfSeedPhraseOperation] = useState<string>("");
  
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
    {typeOfSeedPhraseOperation && <h3>{typeOfSeedPhraseOperation}</h3>} 
    </div>
  )
}
