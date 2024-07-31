import Head from "next/head"
import Link from "next/link"
import Title from "../components/Title"
import { getProducts } from "../lib/products"
import ProductCard from "../components/ProductCard"

export const getStaticProps = async () => {
  console.log("[HomePage] getStaticProps()")
  const products = await getProducts()
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS)
  }
}

export default function HomePage({ products }) {
  console.log("[HomePae] render", products)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title children={"Next Shop"} />
        <ul className="grid grid-cols-1 lg:grid-cols-3">
          {products.map(product => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
