import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Heading, Text, Button } from "@chakra-ui/react";
import axios from "axios";

function Contract({ id, title, desc, skill, status, worker }) {
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = () => {
    axios
      .put(
        `${process.env.URL}/contracts/${id}`,
        { status: "signed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(setNewStatus("signed"));
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{title}</Heading>
      <Heading fontSize="sm" color="grey">
        Required Skill: {skill}
      </Heading>
      <Heading fontSize="sm" color="blue">
        Worker: {worker}
      </Heading>
      <Heading fontSize="sm" color="red">
        {newStatus}
      </Heading>
      <Text mt={4}>{desc}</Text>
      {newStatus === "unsigned" &&
      localStorage.getItem("isWorker") === "true" ? (
        <Button onClick={handleSubmit}>Sign contract</Button>
      ) : null}
    </Box>
  );
}

export default function ContractList() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.URL}/contracts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
      })
      .then((response) => response.data)
      .then(setContracts);
  }, []);

  return (
    <SimpleGrid columns={4} spacing={2}>
      {contracts.map((contract) => (
        <Contract
          id={contract.id}
          title={contract.title}
          desc={contract.description}
          skill={contract.skill}
          worker={contract.worker}
          status={contract.status}
        />
      ))}
    </SimpleGrid>
  );
}
