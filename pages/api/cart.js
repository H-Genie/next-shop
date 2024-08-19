import { fetchJson } from "../../lib/api"

const { CMS_URL } = process.env

const stripCartItem = cartItem => {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price
    },
    quantity: cartItem.quantity
  }
}

const handleCart = async (req, res) => {
  const { jwt } = req.cookie
  if (!jwt) {
    res.status(401).end()
    return
  }

  try {
    const cartItem = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
    res.status(200).json(cartItem.map(stripCartItem))
  } catch (err) {
    res.status(401).end()
  }
}

export default handleCart
