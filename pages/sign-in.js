import { useState } from "react"
import Button from "../components/Button"
import Field from "../components/Field"
import Input from "../components/Input"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"

export default function SigninPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetchJson("http://localhost:4000/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password })
    })
    console.log("sign in:", response)
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
        <Button type="submit">Sign In</Button>
      </form>
    </Page>
  )
}
