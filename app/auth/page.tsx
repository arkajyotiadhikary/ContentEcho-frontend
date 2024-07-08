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
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authServices";
import cookie from "cookie";

// todo move this to another component
// password input with show/hide
function PasswordInput({ id, user, setUser }: { id: string; user: any; setUser: any }) {
      const [show, setShow] = useState(false);
      const handleClick = () => setShow(!show);

      return (
            <InputGroup size="md">
                  <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        id={id}
                        required
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
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
      const searchParams = useSearchParams();
      const [isSignIn, setIsSignIn] = useState(true);
      const [user, setUser] = useState({ username: "", email: "", password: "" });
      const toast = useToast();
      const router = useRouter();

      useEffect(() => {
            const isSignInParam = searchParams?.get("isSignIn") || false;
            if (isSignInParam !== null) {
                  setIsSignIn(isSignInParam === "true");
            }
      }, [searchParams]);

      // toggle form between sign in and sign up
      const toggleAuthMode = () => setIsSignIn(!isSignIn);

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const response = isSignIn
                  ? await authService.login(user.email, user.password)
                  : await authService.register(user.email, user.username, user.password);

            console.log(response);

            if (response?.status === 200) {
                  if (isSignIn) {
                        document.cookie = cookie.serialize("token", response.data.jwt, {
                              httpOnly: true,
                              maxAge: 60 * 60 * 24 * 7, // 1 week
                              sameSite: "strict",
                              path: "/",
                        });
                  }
                  toast({
                        title: isSignIn ? "Sign In Successful" : "Sign Up Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                  });
                  router.push("/articles");
            } else {
                  toast({
                        title: isSignIn ? "Sign In Failed" : "Sign Up Failed",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                  });
            }
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
                        <h1 className="text-2xl text-center">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                        <form onSubmit={handleSubmit}>
                              <VStack spacing={4}>
                                    {!isSignIn && (
                                          <FormControl>
                                                <FormLabel htmlFor="username">Username</FormLabel>
                                                <Input
                                                      type="text"
                                                      id="username"
                                                      required
                                                      onChange={(e) =>
                                                            setUser({
                                                                  ...user,
                                                                  username: e.target.value,
                                                            })
                                                      }
                                                />
                                          </FormControl>
                                    )}
                                    <FormControl>
                                          <FormLabel htmlFor="email">Email address</FormLabel>
                                          <Input
                                                type="email"
                                                id="email"
                                                required
                                                onChange={(e) =>
                                                      setUser({ ...user, email: e.target.value })
                                                }
                                          />
                                          <FormHelperText>
                                                We will never share your email.
                                          </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                          <FormLabel htmlFor="password">Password</FormLabel>
                                          <PasswordInput
                                                id="password"
                                                user={user}
                                                setUser={setUser}
                                          />
                                    </FormControl>
                                    <Button
                                          type="submit"
                                          width="full"
                                          bgColor={"#213951"}
                                          color={"white"}
                                          _hover={{ bg: "#f6828c" }}
                                    >
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
                                          color={"#213951"}
                                          variant="link"
                                          onClick={toggleAuthMode}
                                          _hover={{ color: "#f6828c" }}
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
