import React from "react";
import { Box, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex as="nav" justifyContent="space-between" p={4}>
      <Box>
        <Link as={RouterLink} to="/" px={2}>
          Home
        </Link>
        <Link as={RouterLink} to="/workouts" px={2}>
          Workouts
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
