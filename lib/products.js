const stripProduct = product => {
  return {
    id: product.id,
    title: product.title
  }
}

export const getProducts = async () => {
  const response = await fetch("http://localhost:4000/products")
  const products = await response.json()
  return products.map(stripProduct)
}
