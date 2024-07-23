// Option 1a: fetch products on the server side (in getServerSideProps)
import Head from "next/head"
import Title from "../components/Title"
import { getProducts } from "../lib/products"

export const getServerSideProps = async () => {
  console.log("[HomePage] getServerSideProps()")
  const products = await getProducts()
  return { props: { products } }
}

export default function HomePage({ products }) {
  console.log("🚀 ~ products:", products)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title children={"Next Shop"} />
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}
