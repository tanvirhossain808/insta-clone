import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useFollowUnFollow from "../../hooks/useFollowUnfollowUser";

const SuggestedUser = ({ user: { profilePictureUrl, followers, following, fullName } }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnFollow();
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={profilePictureUrl} name={fullName} size={"md"} />
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {fullName}
                    </Box>
                    <Box fontSize={11} fontWeight={"bold"} color={"gray.500"}>
                        {followers.length} followers
                    </Box>

                </VStack>
            </Flex>
            <Button fontSize={13} bg={"transparent"}
                p={0}
                h={"max-content"}
                fontWeight={"medium"}
                color={"blue.400"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                onClick={() => setIsFollowed(!isFollowed)}>
                {isFollowed ? "unFollow" : "Follow"}
            </Button>
        </Flex>
    );
};

export default SuggestedUser;