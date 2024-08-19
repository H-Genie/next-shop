import { useQuery } from "@tanstack/react-query"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"

export default function Cart() {
  const query = useQuery({
    queryKey: ["cartItmes"],
    queryFn: () => fetchJson("/api/cart")
  })
  const cartItems = query.data

  console.log("[CartPage] cartItems : ", cartItems)

  return <Page title={"Cart"}></Page>
}
