import { Flex, HStack } from "@chakra-ui/react";
import ContractCreationForm from "../../components/contracts/creation_form";
import ContractList from "../../components/contracts/list";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Contracts() {
  return <ContractList />;
}
