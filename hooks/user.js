import { useQuery } from "@tanstack/react-query"
import { fetchJson } from "../lib/api"

export default function useUser() {
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
  return query.data
}
