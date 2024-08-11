import Link from "next/link"
import { fetchJson } from "../lib/api"
import { useQuery } from "@tanstack/react-query"

export default function NavBar() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await fetchJson("/api/user")
      } catch (err) {
        return undefined
      }
    },
    staleTime: 30_000,
    gcTime: Infinity // deprecated cacheTime
  })
  const user = query.data

  const handleSignOut = async () => {
    await fetchJson("/api/logout")
    // setUser(undefined)
  }

  console.log("[NavBar] user", user)

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href={"/"}>Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/sign-in"}>Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
