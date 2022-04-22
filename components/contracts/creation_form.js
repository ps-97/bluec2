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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import  SkillSelect  from "../skill_select";
import  WorkerSelect  from "../worker_select";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ContractCreationForm({onSuccess}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillId, setSkillId] = useState("");
  const [workerId, setWorkerId] = useState("");

  const { push } = useRouter();
  const toast = useToast();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.URL}/contracts`, {
        title: title,
        description: description,
        skill_id: skillId,
        worker_id: workerId
      }, {headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}`}})
      .then((response) => {
        setTitle("")
        setDescription("")
        setSkillId("")
        setWorkerId("")
        toast({
          title: "Contract posted",
          id: "contract_create",
          status: "info",
          isClosable: true,
          duration: 3000,
        })
      })
      .catch(() =>{
        setTitle("")
        setDescription("")
        setSkillId("")
        setWorkerId("")
        toast({
          title: "Contract creation failed",
          id: "sigunup_error",
          status: "error",
          isClosable: true,
          duration: 3000,
        })}
      );
  };

  return (
    <Flex width="full" alignItems="center" justifyContent="center" minH="70vh" minW="70vh">
      <Box p={20} borderWidth={0}>
        <Box textAlign="center">
          <Heading>Post A contract</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input id="title" type="text" value={title || "" }onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description }</FormLabel>
              <Textarea minH="30vh" value={description || ""} resize={"vertical"} id="description" type="description" onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
                <SkillSelect
                  placeholder={"select necessory skill"}
                  isMulti={false}
                  closeMenuOnSelect={true}
                  value={skillId === "" ? "" : ""}
                  onChange={(e) => setSkillId(e.value)}
                />
            </FormControl>
            <FormControl mt={6}>
                <WorkerSelect
                  placeholder={"select necessory skill"}
                  isMulti={false}
                  closeMenuOnSelect={true}
                  skillId={skillId}
                  value={workerId === "" ? "" : ""}
                  onChange={(e) => setWorkerId(e.value)}
                />
            </FormControl>
            <Button width="full" mt={4} type="submit" onClick={onSuccess}>
              Post
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
