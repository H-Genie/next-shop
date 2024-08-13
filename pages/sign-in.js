import { useState } from "react"
import Button from "../components/Button"
import Field from "../components/Field"
import Input from "../components/Input"
import Page from "../components/Page"
import { useRouter } from "next/router"
import { useSignIn } from "../hooks/user"

export default function SigninPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signIn, signInError, signInPending } = useSignIn()

  const handleSubmit = async e => {
    e.preventDefault()
    const valid = await signIn(email, password)
    if (valid) router.push("/")
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
        {signInError && <p className="text-red-700">Invalid credential</p>}
        {signInPending ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  )
}
