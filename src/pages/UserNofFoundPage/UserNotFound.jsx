import { Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const UserNotFound = () => {
    return (
        <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>

            <Text fontSize={"2xl"}>User Not Found</Text>
            <Link as={RouterLink} top={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    );
};

export default UserNotFound;