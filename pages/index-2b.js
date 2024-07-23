// Option 2: fetch products on the client side (in useEffect)
// from an internal API route
import Head from "next/head"
import Title from "../components/Title"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    ;(async () => {
      const response = await fetch("/api/products")
      const products = await response.json()
      setProducts(products)
    })()
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
