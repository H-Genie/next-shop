import { useState } from "react"
import Button from "../components/Button"
import Field from "../components/Field"
import Input from "../components/Input"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function SigninPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await mutation.mutateAsync()
      queryClient.setQueryData("user", user)

      console.log("sign in:", user)
      router.push("/")
    } catch (err) {
      // mutation.isError will be true
    }
  }

  return (
    <Page title={"Sign in"}>
      <form onSubmit={handleSubmit}>
        <Field label={"Email"}>
          <Input
            type={"email"}
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </Field>
        <Field label={"Password"}>
          <Input
            type={"password"}
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Field>
        {mutation.isError && <p className="text-red-700">Invalid credential</p>}
        {mutation.isPending ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  )
}
