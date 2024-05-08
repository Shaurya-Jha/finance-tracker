import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ClerkProvider } from "@clerk/clerk-react"

// clerk key
const PUBLiSHABLE_KEY = import .meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLiSHABLE_KEY) {
  throw new Error("Missing Publishable key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLiSHABLE_KEY}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
