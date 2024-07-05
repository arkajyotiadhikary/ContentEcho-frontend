import React from "react";
import Link from "next/link";
import { Box, Flex, Button } from "@chakra-ui/react";
const LandingHeader = () => {
      return (
            <Box
                  bgGradient={`linear(to-t, transparent, white)`}
                  py={2}
                  backgroundColor={"rgba(0, 0, 0, 0)"}
            >
                  <Flex className="container mx-auto" justify="space-between" align="center" px={6}>
                        <Link href="/" passHref>
                              <Box as="a" fontSize="2xl" fontWeight="bold" color="#213951">
                                    ContentEcho
                              </Box>
                        </Link>

                        <Flex align="center">
                              <Link href="/" passHref>
                                    <Box
                                          as="a"
                                          fontSize="sm"
                                          fontWeight="bold"
                                          color="#213951"
                                          mr={7}
                                    >
                                          Sign in
                                    </Box>
                              </Link>
                              <Button
                                    color={"white"}
                                    bgColor={"#5a7483"}
                                    variant="solid"
                                    rounded={"full"}
                                    size={"sm"}
                              >
                                    Get Started
                              </Button>
                        </Flex>
                  </Flex>
            </Box>
      );
};

export default LandingHeader;
