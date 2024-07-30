import { fetchJson } from "./api"

const CMS_URL = process.env.CMS_URL

export const getProduct = async id => {
  const product = await fetchJson(`${CMS_URL}/products/${id}`)
  return stripProduct(product)
}

export const getProducts = async () => {
  const products = await fetchJson(`${CMS_URL}/products`)
  return products.map(stripProduct)
}

const stripProduct = product => {
  return {
    id: product.id,
    title: product.title,
    description: product.description
  }
}
