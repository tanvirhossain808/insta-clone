import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";
import useProfileStore from "../../store/useProfileStore";
import useAuthStore from "../../store/useAuthStore";
import EditProfile from "./EditProfile";
import useFollowUnFollow from "../../hooks/useFollowUnfollowUser";
import usePostStore from "../../store/usePostStore";

const ProfileHeader = () => {
    const { userProfile } = useProfileStore();
    const { user } = useAuthStore();
    const { posts } = usePostStore()
    const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnFollow(userProfile?.uid);
    const visitingOwnProfileAndAuthenticated = user && user.userName === userProfile.userName;
    const visitinganotherUserProfileAndAuthenticated = user && user.userName !== userProfile.userName;
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(userProfile);
    return (
        <Flex gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                alignSelf={"flex-start"}
                mx={"auto"}>
                <Avatar name="As a Programmer" src={userProfile.profilePictureUrl} alt="As a programmer logo" />
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>

                {visitingOwnProfileAndAuthenticated && <Flex gap={4}
                    direction={{ base: "column", sm: "row" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.userName}</Text>
                    <Flex gap={4} alignItems={"center"} justify={"center"}>
                        <Button
                            bg={"white"}
                            color={"black"}
                            _hover={{ bg: "whiteAlpha.800" }}
                            size={{ base: "xs", md: "sm" }}
                            onClick={onOpen}
                        >
                            Edit Profile
                        </Button>
                    </Flex>

                </Flex>}
                {visitinganotherUserProfileAndAuthenticated && <Flex gap={4}
                    direction={{ base: "column", sm: "row" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.userName}</Text>
                    <Flex gap={4} alignItems={"center"} justify={"center"}>
                        <Button
                            bg={"blue.500"}
                            color={"white"}
                            _hover={{ bg: "whiteAlpha.800" }}
                            size={{ base: "xs", md: "sm" }}
                            onClick={handleFollowUnfollow}
                            isLoading={isUpdating}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    </Flex>

                </Flex>}
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.userName}</Text>
                </Flex>
                <Text fontSize={"sm"} >{userProfile.bio}</Text>
            </VStack>
            {isOpen && < EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    );
};

export default ProfileHeader;