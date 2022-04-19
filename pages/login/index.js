import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Flex,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast();

  const handleChange = (e) => {
    e.target.type == "email" ? setEmail(e.target.value) : setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3003/login", {
      email: email,
      password: password
    }).then(response => localStorage.setItem("token", response.data.token))
    .catch( () =>
      toast({
        title: "Login failed",
        id: "login_error",
        status: "error",
        isClosable: true,
        duration: 10000
      })
    )
  }
  return (
    <Flex width="full" alignItems="center" justifyContent="center" minH="100vh">
      <Box p={20} borderWidth={1}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" onChange={handleChange}/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" onChange={handleChange}/>
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}
