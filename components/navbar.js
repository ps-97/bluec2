import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import ContractCreationForm from "../components/contracts/creation_form";
import { useRouter } from "next/router";

const Links = [
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

const PostContract = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover maxW="70vh" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>
        <Button
          variant={"solid"}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          leftIcon={<AddIcon />}
        >
          Post Contract
        </Button>
      </PopoverTrigger>
      <PopoverContent minW="70vh">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <ContractCreationForm onSuccess={onClose} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default function withAction() {
  const { push, pathname } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    console.log("here")
    localStorage.removeItem("authToken")
    localStorage.removeItem("isWorker")
    push("/login")
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Avatar
                size={"sm"}
                src={
                  "https://www.infojiniconsulting.com/wp-content/uploads/2020/02/blue-collar-workers.jpg"
                }
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href}>{link.name}</NavLink>
              ))}
              { localStorage.getItem("isWorker") != "true" ?
              <PostContract /> : null }
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem><Button onClick={logout} > Logout</Button></MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
