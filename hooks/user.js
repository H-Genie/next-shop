import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchJson } from "../lib/api"

export const useSignIn = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ email, password }) => {
      return fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
    }
  })
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password })
        queryClient.setQueryData("user", user)
        return true
      } catch (err) {
        return false
      }
    },
    signInError: mutation.isError,
    signInPending: mutation.isPending
  }
}

export const useUser = () => {
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
