import { useQuery } from "@tanstack/react-query"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"

const formatCurrency = value => {
  return "$" + value.toFixed(2)
}

const buildCart = cartItems => {
  let total = 0.0
  const items = []
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.product.price * cartItem.quantity
    total += itemTotal
    items.push({ ...cartItem, total: itemTotal })
  }
  return { items, total }
}

const CartTable = ({ cartItems }) => {
  const cart = buildCart(cartItems)
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map(cartItem => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">{cartItem.product.title}</td>
            <td className="px-4 py-2">
              {formatCurrency(cartItem.product.price)}
            </td>
            <td className="px-4 py-2">{cartItem.quantity}</td>
            <td className="px-4 py-2">{formatCurrency(cartItem.total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">Total</th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right">{formatCurrency(cart.total)}</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default function Cart() {
  const query = useQuery({
    queryKey: ["cartItmes"],
    queryFn: () => fetchJson("/api/cart")
  })
  const cartItems = query.data

  console.log("[CartPage] cartItems : ", cartItems)

  return (
    <Page title={"Cart"}>
      {cartItems && <CartTable cartItems={cartItems} />}
    </Page>
  )
}
