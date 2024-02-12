import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useFollowUnFollow from "../../hooks/useFollowUnfollowUser";
import useAuthStore from "../../store/useAuthStore";

const SuggestedUser = ({ user: { profilePictureUrl, followers, following, fullName, uid }, setUser, user: profileSearchUser }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { user } = useAuthStore();
    console.log(profileSearchUser, "followers");
    const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnFollow(uid);
    console.log(isFollowing, 'following');
    const onFollowUser = () => {
        setUser({
            ...profileSearchUser,
            followers: isFollowing ? profileSearchUser.followers.filter(uid => uid !== user.uid) : [...profileSearchUser.followers, user.uid]
        });
        handleFollowUnfollow();
    }
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
            {
                user.uid !== uid && (<Button fontSize={13} bg={"transparent"}
                    p={0}
                    h={"max-content"}
                    fontWeight={"medium"}
                    color={"blue.400"}
                    cursor={"pointer"}
                    _hover={{ color: "white" }}
                    isLoading={isUpdating}
                    onClick={onFollowUser}>
                    {isFollowing ? "unFollow" : "Follow"}
                </Button>)
            }

        </Flex>
    );
};

export default SuggestedUser;