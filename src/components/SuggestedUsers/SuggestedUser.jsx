import { Avatar, Box, Button, Flex, VStack, useToast } from "@chakra-ui/react";
import useFollowUnFollow from "../../hooks/useFollowUnfollowUser";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user: { profilePictureUrl, followers, fullName, uid, userName }, setUser, user: profileSearchUser }) => {
    const showToast = useToast();
    const { user } = useAuthStore();
    const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnFollow(uid);
    const onFollowUser = async () => {
        try {
            await handleFollowUnfollow(user);
            if (setUser) {
                setUser({
                    ...profileSearchUser,
                    followers: isFollowing ? profileSearchUser.followers.filter(uid => uid !== user.uid) : [...profileSearchUser.followers, user.uid]
                });
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }

    }
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>

                <Link to={`/${userName}`}>
                    <Avatar src={profilePictureUrl} name={fullName} size={"md"} />
                </Link>

                <VStack spacing={2} alignItems={"flex-start"}>
                    <Link to={`/${userName}`}>
                        <Box fontSize={12} fontWeight={"bold"}>
                            {fullName}
                        </Box>
                    </Link>
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