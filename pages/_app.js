import "../styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps, sessio }) {
  const { push, pathname } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token && pathname != "/signup") {
      push("/login");
    } else {
      console.log(pathname);
      if (pathname == "/login") push("/");
    }
  }, []);
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
