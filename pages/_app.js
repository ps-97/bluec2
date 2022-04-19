import '../styles/global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps, sessio }) {
  const { push, pathName } = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if(!token || pathName != "/signup") {
      push("/login")
    }
  }, [])
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
