import { useState } from "react"
import Button from "../components/Button"
import Field from "../components/Field"
import Input from "../components/Input"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"

// const sleep = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

export default function SigninPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState({ loading: false, error: false })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus({ loading: true, error: false })
    // await sleep(2000)
    try {
      const response = await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      setStatus({ loading: false, error: false })
      console.log("sign in:", response)
    } catch (err) {
      setStatus({ loading: false, error: true })
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
        {status.error && <p className="text-red-700">Invalid credential</p>}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  )
}
