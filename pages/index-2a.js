// Option 2: fetch products on the client side (in useEffect)
// directly from an external API
import Head from "next/head"
import Title from "../components/Title"
import { useEffect, useState } from "react"
import { getProducts } from "../lib/products"

export default function HomePage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts().then(product => setProducts(product))
  }, [])

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
