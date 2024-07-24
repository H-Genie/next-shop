import Head from "next/head"
import Title from "../../components/Title"
import { getProduct, getProducts } from "../../lib/products"

export const getStaticPaths = async () => {
  const products = await getProducts()
  return {
    paths: products.map(product => ({
      params: { id: product.id.toString() }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const product = await getProduct(id)
  return {
    props: { product },
    revalidate: 30
  }
}

export default function ProductPage({ product }) {
  console.log("🚀 ~ ProductPage ~ product:", product)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  )
}
