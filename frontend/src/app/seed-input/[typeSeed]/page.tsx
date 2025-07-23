import { SeedPhraseInput } from "@/components/ui/SeedPhraseInput";

 const Page = async ({params} : {params: Promise<{typeSeed: string}>}) => {
   const { typeSeed } = await params;
  return (
    <div>
      <SeedPhraseInput typeSeed={typeSeed} />
    </div>
  )
}

export default Page;
