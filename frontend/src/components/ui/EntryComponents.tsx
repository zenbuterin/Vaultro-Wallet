'use client'
import { useRouter } from "next/navigation";

export const EntryComponents = () => {
  const router = useRouter();

  return (
    <div className=""> 
      <select className="" onChange={e => {if (e.target.value == "SeedPhraseImport") router.push(`/seed-input/SeedPhraseImport`)}}>
        <option className="" value="">Import private key or seed phrase</option>
        <option className="" value="PrivateKey" >private key</option>
        <option className="" value="SeedPhraseImport">Seed Phrase</option>
      </select>
      <button className="" onClick={() => router.push(`/seed-input/SeedPhraseCreate`)}>Create Wallet</button>
    </div>
  )
}
