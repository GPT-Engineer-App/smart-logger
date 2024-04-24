import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, useToast, VStack, Heading } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [healthStatus, setHealthStatus] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-de0d.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-de0d.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      toast({
        title: "Signup successful",
        description: "You can now login",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error signing up",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const checkHealth = async () => {
    try {
      const response = await fetch("https://backengine-de0d.fly.dev/healthcheck");
      const data = await response.json();
      setHealthStatus(data.status);
    } catch (error) {
      setHealthStatus("Service unavailable");
    }
  };

  return (
    <Container>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Welcome to Our Service
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignup}>
          Signup
        </Button>
        <Button onClick={checkHealth}>Check Health</Button>
        {healthStatus && <Text>Health Status: {healthStatus}</Text>}
        {isLoggedIn && <Text>You are logged in!</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
