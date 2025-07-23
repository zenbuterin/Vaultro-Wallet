import { useState } from "react"

export const EntryComponents = () => {
  const [importValue, setImport] = useState<string>("");  

  function selectDropDownValue(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value !== "") {
      setImport(event.target.value);
    }
    else {
    }
  }
  return (
    <div className=""> 
      <select className="" value={importValue} onChange={selectDropDownValue}>
        <option className="" value="">Import</option>
        <option className="" value="PrivateKey" >private key</option>
        <option className="SeedPhrase">Seed Phrase</option>
      </select>
      <button className="">Crate Wallet</button>
    </div>
  )
}
