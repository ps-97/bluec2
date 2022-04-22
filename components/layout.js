import Navbar from "./navbar";
import React, { useEffect, useState } from "react";

export default function Layout({ children, home }) {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"))
  }, []);

  console.log(authToken != (null || ""))
  return (
    <>
    { authToken == (null) ? null : <Navbar />}
      <main>{children}</main>
    </>
  );
}
