import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "../styles/globals.css"

const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
