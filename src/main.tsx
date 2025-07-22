import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './utils/store/Store.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <App />
    </ThemeProvider>
  </Provider>,
)
