"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  link: string;
}

const NavLink = (props: Props) => {
  const { children, link } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={link}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        boxShadow={"sm"}
        borderBottom={"1px solid rgba(0,0,0,0.1)"}
        bg={useColorModeValue("#FAFAFA", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} marginLeft={20}>
            <Box fontSize={18} color={"green.500"} fontWeight={"bold"}>
              LeavNG | 假条生成器
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink key={"home"} link={"#"}>
                首页
              </NavLink>
              <NavLink
                key={"csv2json"}
                link={"https://www.bejson.com/json/col2json/"}
              >
                CSV转JSON
              </NavLink>
              <NavLink key={"neauacm"} link={"https://home.neauacm.cn/"}>
                NEAUACM
              </NavLink>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink key={"home"} link={"#"}>
                首页
              </NavLink>
              <NavLink
                key={"csv2json"}
                link={"https://www.bejson.com/json/col2json/"}
              >
                CSV转JSON
              </NavLink>
              <NavLink key={"neauacm"} link={"https://home.neauacm.cn/"}>
                NEAUACM
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
