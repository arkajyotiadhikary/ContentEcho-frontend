"use client";
import {
      Box,
      Button,
      FormControl,
      FormLabel,
      FormHelperText,
      Input,
      Heading,
      Text,
      VStack,
      InputGroup,
      InputRightElement,
      useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

function PasswordInput() {
      const [show, setShow] = useState(false);
      const handleClick = () => setShow(!show);

      return (
            <InputGroup size="md">
                  <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        required
                  />
                  <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? "Hide" : "Show"}
                        </Button>
                  </InputRightElement>
            </InputGroup>
      );
}

const Auth = () => {
      const [isSignIn, setIsSignIn] = useState(true);
      const toggleAuthMode = () => setIsSignIn(!isSignIn);
      const toast = useToast();

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            toast({
                  title: isSignIn ? "Sign In Successful" : "Sign Up Successful",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
            });
      };

      return (
            <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                  bg="gray.100"
            >
                  <Box width="full" maxW="md" p={8} borderRadius="xl" boxShadow="md" bg="white">
                        <Heading as="h2" size="xl" textAlign="center" mb={6}>
                              {isSignIn ? "Sign In" : "Sign Up"}
                        </Heading>
                        <form onSubmit={handleSubmit}>
                              <VStack spacing={4}>
                                    {!isSignIn && (
                                          <FormControl>
                                                <FormLabel>Username</FormLabel>
                                                <Input type="text" id="username" required />
                                          </FormControl>
                                    )}
                                    <FormControl>
                                          <FormLabel>Email address</FormLabel>
                                          <Input type="email" required />
                                          <FormHelperText>
                                                We will never share your email.
                                          </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                          <FormLabel>Password</FormLabel>
                                          <PasswordInput />
                                    </FormControl>
                                    <Button type="submit" width="full" colorScheme="blue">
                                          {isSignIn ? "Sign In" : "Sign Up"}
                                    </Button>
                              </VStack>
                        </form>
                        <Box textAlign="center" mt={4}>
                              <Text>
                                    {isSignIn
                                          ? "Don't have an account?"
                                          : "Already have an account?"}{" "}
                                    <Button
                                          variant="link"
                                          colorScheme="blue"
                                          onClick={toggleAuthMode}
                                    >
                                          {isSignIn ? "Sign Up" : "Sign In"}
                                    </Button>
                              </Text>
                        </Box>
                  </Box>
            </Box>
      );
};

export default Auth;
