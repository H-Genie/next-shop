import Head from "next/head"
import Title from "../components/Title"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title children={"Next Shop"} />
        <p>[TODO: display products]</p>
      </main>
    </>
  )
}
