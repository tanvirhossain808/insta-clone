import { Box, Link, Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
    return (
        <>

            <VStack py={8} px={6} gap={4}>
                <SuggestedHeader />
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                    <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                        suggested
                    </Text>
                    <Text fontSize={12}
                        fontWeight={"bold"}
                        _hover={{ color: "gray.400" }}
                        cursor={"pointer"}>
                        see all
                    </Text>
                </Flex>
                <SuggestedUser name="Dan Abrahmov" followers={1400} avatar="https://bit.ly/dan-abramov" />
                <SuggestedUser name="Ryan Florence" followers={720} avatar="https://bit.ly/ryan-florence" />
                <SuggestedUser name="Christian Nwamba" followers={900} avatar="https://bit.ly/code-beast" />
                <Box
                    fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                    @2024 Built By{" "}
                    <Link href="https://www.linkedin.com/in/tanvirhossain808/" target="_blank" color={"blue.500"} fontSize={14}>Tanvir Hossain</Link>
                </Box>
            </VStack>

        </>
    );
};

export default SuggestedUsers;