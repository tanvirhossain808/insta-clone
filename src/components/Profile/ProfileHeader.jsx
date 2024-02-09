import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from "@chakra-ui/react";

const ProfileHeader = () => {
    return (
        <Flex gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                alignSelf={"flex-start"}
                mx={"auto"}>
                <Avatar name="As a Programmer" src="/profilepic.png" alt="As a programmer logo" />
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4}
                    direction={{ base: "column", sm: "row" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>asaprogrammer_</Text>
                    <Flex gap={4} alignItems={"center"} justify={"center"}>
                        <Button
                            bg={"white"}
                            color={"black"}
                            _hover={{ bg: "whiteAlpha.800" }}
                            size={{ base: "xs", md: "sm" }}
                        >
                            Edit Profile
                        </Button>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>4</Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>240</Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>40</Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>As a programmer</Text>
                </Flex>
                <Text fontSize={"sm"} >Passions that are meant to level up a programmer skills</Text>
            </VStack>

        </Flex>
    );
};

export default ProfileHeader;