import { getProducts } from "../../lib/products"

const handler = async (_, res) => {
  console.log("[/api/products] handler")
  const products = await getProducts()
  res.status(200).json(products)
}

export default handler
