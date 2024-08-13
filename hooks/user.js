import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchJson } from "../lib/api"

const USER_QUERY_KEY = "user"

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
        queryClient.setQueryData([USER_QUERY_KEY], user)
        return true
      } catch (err) {
        return false
      }
    },
    signInError: mutation.isError,
    signInPending: mutation.isPending
  }
}

export const userSignOut = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => fetchJson("/api/logout")
  })

  return async () => {
    await mutation.mutateAsync()
    queryClient.setQueryData([USER_QUERY_KEY], null)
  }
}

export const useUser = () => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
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
