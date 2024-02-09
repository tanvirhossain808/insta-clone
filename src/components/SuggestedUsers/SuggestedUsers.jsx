import { Box, Flex, Text, VStack } from "@chakra-ui/react";
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
                <SuggestedUser />
                <SuggestedUser />
                <SuggestedUser />
                <Box
                    fontSize={12} color={"gray.500"} mt={5}>
                    @2024 Built By{" "}
                </Box>
            </VStack>

        </>
    );
};

export default SuggestedUsers;