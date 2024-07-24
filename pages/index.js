import Head from "next/head"
import Link from "next/link"
import Title from "../components/Title"
import { getProducts } from "../lib/products"

export const getStaticProps = async () => {
  console.log("[HomePage] getStaticProps()")
  const products = await getProducts()
  return {
    props: { products },
    revalidate: 60 * 5
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
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
