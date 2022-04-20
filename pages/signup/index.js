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
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [isWorker, setIsWorker] = useState(true);
  const [skillIds, setSkillIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState([]);

  const { push } = useRouter();
  const toast = useToast();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "phonenumber":
        setPhonenumber(e.target.value);
        break;
    }
  };

  const handleSubmit = (e) => {
    console.log("here");
    console.log(email, password, name, phonenumber, skillIds);
    e.preventDefault();
    axios
      .post("http://localhost:3003/users", {
        email: email,
        password: password,
        name: name,
        phone_number: phonenumber,
        skill_ids: skillIds,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        console.log("here");
        push("/");
      })
      .catch(() =>
        toast({
          title: "Signup failed",
          id: "sigunup_error",
          status: "error",
          isClosable: true,
          duration: 3000,
        })
      );
  };

  useEffect(() => {
    const skillOptions = axios
      .get("http://localhost:3003/skills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) =>
        response.data.map((skill) => ({ value: skill.id, label: skill.name }))
      )
      .then(setSkills);
  }, []);

  useEffect(() => {
    console.log(skills);
    setGroupedSkills([
      {
        label: "skills",
        options: skills,
      },
    ]);
  }, [skills]);

  return (
    <Flex width="full" alignItems="center" justifyContent="center" minH="100vh">
      <Box p={20} borderWidth={1}>
        <Box textAlign="center">
          <Heading>Signup</Heading>
        </Box>
        <FormControl mt={6}>
          <FormLabel>Looking for work? </FormLabel>
          <RadioGroup onChange={setIsWorker} value={isWorker}>
            <Stack direction="row">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input id="name" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input id="email" type="email" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Phonenumber</FormLabel>
              <Input id="phonenumber" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                onChange={handleChange}
              />
            </FormControl>
            {isWorker === "true" ? (
              <FormControl mt={6}>
                <Select
                  id="skills"
                  name="skills"
                  options={groupedSkills}
                  placeholder="Select your skills..."
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={(e) => setSkillIds(e.map((skill) => skill.value))}
                />
              </FormControl>
            ) : null}
            <Button width="full" mt={4} type="submit">
              Signup
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
