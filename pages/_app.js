import "../styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function App({ Component, pageProps, sessio }) {
  const { push, pathname } = useRouter();
  const [authToken, setAuthToken] = useState(null);

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
